import { EventosPage } from './../pages/eventos/eventos';
import { MuseoPage } from './../pages/museo/museo';
import { CalendarioPage } from './../pages/calendario/calendario';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {Geolocation} from '@ionic-native/geolocation';

import { MyApp } from './app.component';
/*PAGES*/
import { HomePage } from '../pages/home/home';
import { SalaPage } from './../pages/sala/sala';
import { ObraPage } from './../pages/obra/obra';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ObraPage,
    SalaPage,
    CalendarioPage,
    MuseoPage,
    EventosPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ObraPage,
    SalaPage,
    CalendarioPage,
    MuseoPage,
    EventosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation
  ]
})
export class AppModule {}
