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
import { EncuestaPage } from './../pages/encuesta/encuesta';
import { ObraPage } from './../pages/obra/obra';
import { SalasPage } from './../pages/salas/salas';
import { RecorridosPage } from './../pages/recorridos/recorridos';
import { MuseoProvider } from '../providers/museo/museo';
import { EventoProvider } from '../providers/evento/evento';
import { SalaProvider } from '../providers/sala/sala';
import {RecorridoProvider} from '../providers/recorrido/recorrido';
import { ObraProvider } from '../providers/obra/obra';
import { ArtistaProvider } from '../providers/artista/artista';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { HttpClientModule } from '@angular/common/http';
import { FeedbackPage } from '../pages/feedback/feedback';
import { ElasticHeader } from '../directives/elastic-header/elastic-header';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { AcertijoPage } from './../pages/acertijo/acertijo';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
//import { NgProgressModule } from 'ng2-progressbar';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ObraPage,
    SalaPage,
    FeedbackPage,
    SalasPage,
    //FeedbackPage,
    ElasticHeader,
    CalendarioPage,
    MuseoPage,
    EncuestaPage,
    EventosPage,
    RecorridosPage,
    AcertijoPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ObraPage,
    SalaPage,
    SalasPage,
    //FeedbackPage,
    FeedbackPage,
    CalendarioPage,
    EncuestaPage,
    MuseoPage,
    EventosPage,
    RecorridosPage,
    AcertijoPage
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
    UsuarioProvider,
    StreamingMedia,
    RecorridoProvider,
    BarcodeScanner
  ]
})
export class AppModule {}
