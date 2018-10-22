import { EventosPage } from './../pages/eventos/eventos';
import { MuseoPage } from './../pages/museo/museo';
import { CalendarioPage } from './../pages/calendario/calendario';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {Geolocation} from '@ionic-native/geolocation';
import { StarRatingModule } from 'angular-star-rating';
import { Ionic2RatingModule } from 'ionic2-rating';

import { MyApp } from './app.component';
/*PAGES*/
import { HomePage } from '../pages/home/home';
import { SalaPage } from './../pages/sala/sala';
import { ObraPage } from './../pages/obra/obra';
import { FeedbackPage } from '../pages/feedback/feedback';
import { ElasticHeader } from '../directives/elastic-header/elastic-header';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ObraPage,
    SalaPage,
    FeedbackPage,
    ElasticHeader
    CalendarioPage,
    MuseoPage,
    EventosPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    StarRatingModule.forRoot(),
    Ionic2RatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ObraPage,
    SalaPage,
    FeedbackPage
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
