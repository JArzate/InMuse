import { EventosPage } from './../pages/eventos/eventos';
import { MuseoPage } from './../pages/museo/museo';
import { CalendarioPage } from './../pages/calendario/calendario';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {Geolocation} from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';
import { IonicStorageModule } from '@ionic/storage';



import { MyApp } from './app.component';
/*PAGES*/
import { HomePage } from '../pages/home/home';
import { SalaPage } from './../pages/sala/sala';
import { ObraPage } from './../pages/obra/obra';
import { MuseoProvider } from '../providers/museo/museo';
import { EventoProvider } from '../providers/evento/evento';
import { SalaProvider } from '../providers/sala/sala';
import { ObraProvider } from '../providers/obra/obra';
import { ArtistaProvider } from '../providers/artista/artista';
import { UsuarioProvider } from '../providers/usuario/usuario';

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
    IonicStorageModule.forRoot()
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
    Geolocation,
    GoogleMaps,
    MuseoProvider,
    EventoProvider,
    SalaProvider,
    ObraProvider,
    ArtistaProvider,
    UsuarioProvider
  ]
})
export class AppModule {}
