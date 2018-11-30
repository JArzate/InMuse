import { EventoModelo } from './../../modelos/evento-modelo';
import { CalendarioPage } from './../calendario/calendario';
import { Geolocation } from '@ionic-native/geolocation';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
   map: GoogleMap;
   arrayModeloEventos:Array<EventoModelo>;

  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps) {

  }

  ngOnInit(): void {
     this.loadMap();
  }

  loadMap(){
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904, 
          lng: -89.3809802 
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
    this.map.getMyLocation()
    .then(response => {
      this.map.moveCamera({
        target: response.latLng
      });
      this.map.addMarker({
        title: 'My Position',
        icon: 'blue',
        animation: 'DROP',
        position: response.latLng
      });
    })
    .catch(error =>{
      console.log(error);
    });
  }

  IrCalendario = () => {
    this.navCtrl.push(CalendarioPage);
  }

  

}
