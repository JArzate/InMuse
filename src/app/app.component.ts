import { ObraPage } from './../pages/obra/obra';
import { UsuarioModelo } from './../modelos/usuario-model';
import { Storage } from '@ionic/storage';
import { MuseoPage } from './../pages/museo/museo';
import { LoginPage } from './../pages/login/login';
import { HomePage } from './../pages/home/home';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { timer } from 'rxjs/observable/timer';

@Component({
  templateUrl: 'app.html'
})
export class MyApp { 
  @ViewChild(Nav) navCtrl: Nav;
  rootPage:any = MuseoPage;
  user:UsuarioModelo;
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public storage:Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      
      timer(1000).subscribe(()=>{        
        splashScreen.hide();
      });

      if (this.storage.get('usuario')){
        this.storage.get('usuario').then((usuario:any)=>{
          this.user = new UsuarioModelo(usuario);
        });
      }

    });
  }

  irLoginPage = () => {
    this.navCtrl.push(LoginPage);
  }

  logOut = () =>{
    this.storage.remove('usuario').then(()=>{
      this.user = null;
    });
  }
}

