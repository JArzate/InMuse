import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventoProvider } from '../../providers/evento/evento';

/**
 * Generated class for the EventosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-eventos',
  templateUrl: 'eventos.html',
})
export class EventosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventoProvider:EventoProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventosPage');
  }

  getEventos = () => {
    this.eventoProvider.getEventosMes("").then(()=>{

    }).catch(()=>{

    });
  }

}
