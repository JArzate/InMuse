import { HomePage } from './../pages/home/home';
import { EventosPage } from './../pages/eventos/eventos';
import { MuseoPage } from './../pages/museo/museo';
import { CalendarioPage } from './../pages/calendario/calendario';
import { ObraPage } from './../pages/obra/obra';
import { SalaPage } from './../pages/sala/sala';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { timer } from 'rxjs/observable/timer';

@Component({
  templateUrl: 'app.html'
})
export class MyApp { 
  rootPage:any = ObraPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      timer(500).subscribe(()=>{
        splashScreen.hide();
      });
    });
  }
}

