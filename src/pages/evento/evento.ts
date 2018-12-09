import { EventoProvider } from './../../providers/evento/evento';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { EventoModelo } from '../../modelos/evento-modelo';

/**
 * Generated class for the EventoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-evento',
  templateUrl: 'evento.html',
})
export class EventoPage {
  evento:EventoModelo;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public eventProvider:EventoProvider, 
    public alertCtrl:AlertController,
    public loadingCtrl:LoadingController) {
    this.evento = new EventoModelo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventoPage');

    if (this.navParams.get('idEvento')){
      this.getEvento(this.navParams.get('idEvento'));
    }else{
      this.navCtrl.pop();
    }

  }

  getEvento = (idEvento:string) =>{
    let loader = this.loadingCtrl.create({
      content:"Cargando ..."
    });

    loader.present();
    this.eventProvider.getEvento(idEvento).then((response:any)=>{
      loader.dismiss();

      if (response.intStatus == 1){
        this.evento = new EventoModelo(response.jsnAnswer);
      }else{
        this.alertCtrl.create({
          title:"Error",
          message: response.strAnswer
        }).present();
      }
    }).catch((error)=>{
      loader.dismiss();
      this.alertCtrl.create({
        title:"Error",
        message: "Conexión con el servidor falló"
      }).present();
    });
  }

}
