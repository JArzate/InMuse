import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { RecorridoProvider } from '../../providers/recorrido/recorrido';
import { RecorridoModelo } from '../../modelos/recorrido-model';

/**
 * Generated class for the RecorridosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-recorridos',
  templateUrl: 'recorridos.html',
})
export class RecorridosPage {

  public arrayModeloRecorrido: Array<RecorridoModelo>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public recorridoProvider:RecorridoProvider,
    private alert:AlertController
    ) {
      this.arrayModeloRecorrido = new Array<RecorridoModelo>();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecorridosPage');
    this.getRecorrido();
  }

  getRecorrido = () => {

    this.recorridoProvider.getListaRecorridos("5bfa3b92157fa1127215cb9f","5bf75c0ad51ec707a8ea9d88").then((response:any)=>{
      console.log(JSON.stringify(response));
      if(response.intStatus == 1){
        this.arrayModeloRecorrido = response.jsnAnswer;   
       }else{
        this.alert.create({
          title:"Error",
          message: "No se encontraron recorridos"
        }).present();
      }
      
    }).catch(err=>{
      this.alert.create({
        title:"Error",
        message: "Error al conectar con el servidor"
      }).present();
    });
  }

}
