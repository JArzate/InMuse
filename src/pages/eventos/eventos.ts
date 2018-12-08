import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { EventoProvider } from '../../providers/evento/evento';
import { EventoModelo } from '../../modelos/evento-modelo';

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

  arrayModeloEvento: Array<EventoModelo>
  intMesSeleccionado: 0
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public eventoProvider:EventoProvider,
    private alert:AlertController
    
  ) {
    this.arrayModeloEvento = new Array<EventoModelo>();
    this.intMesSeleccionado = navParams.get('intMes');
    console.log(JSON.stringify(this.navParams.data));
  }

  ngOnInit(): void {
    //this.loadMap();
   this.getEventos();
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventosPage');
  }

  getEventos = () => {

    this.eventoProvider.getEventosMes(this.intMesSeleccionado).then((response:any)=>{
      console.log(JSON.stringify(response));
      if(response.intStatus == 1){
        this.arrayModeloEvento = response.jsnAnswer;
      }else{
        this.alert.create({
          title:"Error",
          message: "No se encontraron eventos"
        }).present();
      }
      
    }).catch(err=>{
      this.alert.create({
        title:"Error",
        message: JSON.stringify(err)
      }).present();
    });
  }

}
