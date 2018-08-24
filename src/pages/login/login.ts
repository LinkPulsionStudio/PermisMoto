import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "angularfire2/auth";
import {auth} from "firebase";
import {AngularFirestore} from "angularfire2/firestore";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private connectLoading: Loading;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private afAuth: AngularFireAuth,
              private loadingCtrl: LoadingController,
              private afs: AngularFirestore) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

    this.connectLoading = this.loadingCtrl.create({
      content: 'Connexion en cours...'
    });
  }

  /**
   * This method authenticates the user with FB
   */
  facebookLogin() {
    this.connectLoading.present();

    let fbAuthProvider = new auth.FacebookAuthProvider();
    fbAuthProvider.addScope('email');

    this.afAuth.auth.signInWithPopup(fbAuthProvider).then(res => {
      console.log(res.user);

      //checking if users exists
      this.afs.collection('users').doc(res.user.uid).ref.get().then(doc => {
        if (!doc.exists){
          //insert user in DB
          this.afs.collection('users').doc(res.user.uid).set({
            uid: res.user.uid,
            email: res.user.email,
            displayName: res.user.displayName,
            profilePic: res.user.photoURL
          });
        }
      });
    }).catch(err => {
      this.connectLoading.dismiss();
      console.log(err);
    });
  }
}
