import { EventoPage } from './../evento/evento';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
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
  meses:Array<string> = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  arrayModeloEvento: Array<EventoModelo>
  intMesSeleccionado: 0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public eventoProvider:EventoProvider,
    private alert:AlertController,
    public loadingCtrl:LoadingController
    
  ) {
    this.arrayModeloEvento = new Array<EventoModelo>();
   
  }

  ngOnInit(): void {
    //this.loadMap();
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad EventosPage');
    this.intMesSeleccionado = this.navParams.get('intMes');
    console.log(JSON.stringify(this.navParams.data));
    this.getEventos();
  }

  getEventos = () => {
    let loader = this.loadingCtrl.create({
      content:"Cargando ..."
    });
    loader.present();
    this.eventoProvider.getEventosMes(this.intMesSeleccionado).then((response:any)=>{
      // console.log(JSON.stringify(response));
      loader.dismiss();
      if(response.intStatus == 1){
        this.arrayModeloEvento = response.jsnAnswer;
      }else{
        this.alert.create({
          title:"Error",
          message: "No se encontraron eventos"
        }).present();
      }
      
    }).catch(err=>{
      loader.dismiss();
      this.alert.create({
        title:"Error",
        message: JSON.stringify(err)
      }).present();
    });
  }

  irEvento = (evento:EventoModelo) => {
    this.navCtrl.push(EventoPage,{'idEvento':evento._id});
  }

}
