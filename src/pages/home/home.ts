import { UsuarioModelo } from './../../modelos/usuario-model';
import { EventoModelo } from './../../modelos/evento-modelo';
import { CalendarioPage } from './../calendario/calendario';
import { Geolocation } from '@ionic-native/geolocation';
import { Component } from '@angular/core';
import { NavController, Alert, AlertController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';
import { EventoProvider } from '../../providers/evento/evento';
import { EventoPage } from '../evento/evento';
import { MuseosPage } from '../museos/museos';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   map: GoogleMap;
   arrayModeloEventos:Array<EventoModelo>;
   user:UsuarioModelo = new UsuarioModelo();

  constructor(
    public navCtrl: NavController,
    private googleMaps: GoogleMaps,
    private servicioEvento: EventoProvider,
    private alert:AlertController,
    public storage:Storage
  ) {
    if (this.storage.get('usuario')){
      this.storage.get('usuario').then((usuario:any)=>{
        this.user = new UsuarioModelo(usuario);
      });
    }
    this.arrayModeloEventos = new Array<EventoModelo>();
  }

  ngOnInit(): void {
    //this.loadMap();    
    this.getEventosProximos();

  }

  loadMap(){
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 21.8847689, 
          lng: -102.2879364
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create('map', mapOptions);

    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      this.getPosition();
    })
    .catch(error =>{
      console.log(error);
    });
  }

  getPosition(): void{
    this.map.addMarker({
      title: 'Museo Escárcega',
      icon: 'blue',
      animation: 'DROP',
      position: {lat:21.8847689,lng:-102.2879364}
    });
  }

  IrCalendario = () => {
    this.navCtrl.push(CalendarioPage);
  }

  IrMuseos = () => {
    this.navCtrl.push(MuseosPage);
  }

  getEventosProximos(){
    this.servicioEvento.getEventosProximos().then((response:any)=>{
      if(response.intStatus == 1){
        this.arrayModeloEventos = new Array<EventoModelo>();
        this.arrayModeloEventos = response.jsnAnswer;
      }else{
        
      }
      
    }).catch(err=>{
      this.alert.create({
        title:"Error",
        message: JSON.stringify(err)
      }).present();
    });
  }

  irEvento = (evento:EventoModelo) => {
    this.navCtrl.push(EventoPage,{idEvento:evento._id});
  }

  irLoginPage = () => {
    this.navCtrl.push(LoginPage,{'blnMuseo':false});
  }

  logOut = () =>{
    this.storage.remove('usuario').then(()=>{
      this.user = null;
    });
  }

  

}
