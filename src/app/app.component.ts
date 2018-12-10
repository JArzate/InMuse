import { MuseoProvider } from './../providers/museo/museo';
import { MuseoModelo } from './../modelos/museo-model';
import { UsuarioProvider } from './../providers/usuario/usuario';
import { ObraPage } from './../pages/obra/obra';
import { UsuarioModelo } from './../modelos/usuario-model';
import { Storage } from '@ionic/storage';
import { MuseoPage } from './../pages/museo/museo';
import { LoginPage } from './../pages/login/login';
import { HomePage } from './../pages/home/home';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { timer } from 'rxjs/observable/timer';
import { RecorridosPage } from '../pages/recorridos/recorridos';

@Component({
  templateUrl: 'app.html'
})
export class MyApp { 
  @ViewChild(Nav)nav:NavController;
  rootPage:any = HomePage;
  user:UsuarioModelo;
  museo:MuseoModelo;
  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public storage:Storage, 
    public userProvider:UsuarioProvider,
    public museoProvider:MuseoProvider) {
      platform.ready().then(() => {

        statusBar.styleDefault();

        this.storage.get('usuario').then((usuario:any)=>{
          this.userProvider.user = usuario;
        });

        this.storage.get('museo').then((museo:any)=>{
          this.museoProvider.museo = museo;
        });

        timer(1000).subscribe(()=>{        
          splashScreen.hide();
        });

      });
  }

  ngDoCheck(): void {
    this.user = this.userProvider.user;
    this.museo = this.museoProvider.museo;
  }

  irLoginPage(){
    this.nav.push(LoginPage);
  }

  irRecorridos(){
    if (this.userProvider.user && this.museoProvider.museo){
      this.nav.push(RecorridosPage,{idMuseo:this.museo._id});
    }
  }

  logOut(){
    this.storage.remove('usuario');
    this.userProvider.user = null;
  }

}

