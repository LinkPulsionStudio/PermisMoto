import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import {LoginPage} from "../pages/login/login";
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AngularFireModule} from "angularfire2";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFirestoreModule} from "angularfire2/firestore";

export const environment = {
  production: true,
  firebase: {
    apiKey: "AIzaSyDegnjiZdH1heZh34xqART8aklkmRD_u48",
    authDomain: "permis-moto.firebaseapp.com",
    databaseURL: "https://permis-moto.firebaseio.com",
    projectId: "permis-moto",
    storageBucket: "permis-moto.appspot.com",
    messagingSenderId: "897469545600"
  }
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFirestoreModule
  ]
})
export class AppModule {}
