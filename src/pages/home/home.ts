import { CalendarioPage } from './../calendario/calendario';
import { Geolocation } from '@ionic-native/geolocation';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public map: any;

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {

  }

  ngOnInit(): void {
    let mapOptions = {
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControlOptions: false,
      streetViewControl: false,
      fullscreenControl: false
    }
    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
 
    // this.geolocation.getCurrentPosition().then((pos) => {
    //   let latLng = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

    //   let marker = new google.maps.Marker({
    //     position: latLng,
    //     map: this.map,
    //   });
    //   this.map.setCenter(latLng);
    // });
  }

  IrCalendario = () => {
    this.navCtrl.push(CalendarioPage);
  }

}
