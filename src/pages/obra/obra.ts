import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ObraModelo } from '../../modelos/obra-model';
import { ObraProvider } from '../../providers/obra/obra';
import { StreamingMedia, StreamingAudioOptions } from '@ionic-native/streaming-media';

/**
 * Generated class for the ObraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-obra',
  templateUrl: 'obra.html',
})
export class ObraPage {
  public leer_mas:boolean = false;
  public modeloObra: ObraModelo;
  public arrayModeloObra: Array<ObraModelo>;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public servicioObra: ObraProvider,
    public alert: AlertController,
    private streamingMedia: StreamingMedia
    ) {
    this.modeloObra = new ObraModelo();
    this.arrayModeloObra = new Array();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ObraPage');
    this.getObra();
  }

  ngOnInit(): void {
    //this.loadMap();
    
  }

  reproducirAudio(){
    console.log("va a reproducir");
    let options: StreamingAudioOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      bgImage: this.modeloObra.arrayStrImagen[0]
    };
    this.streamingMedia.playAudio(this.modeloObra.strAudioDescripcion,options);
  }

  async getObra(){
    this.servicioObra.getObra("5bfab67d80250016e6470801").then((response:any)=>{
      if(response.intStatus == 1){
        this.modeloObra = new ObraModelo(response.jsnAnswer);
        console.log(this.modeloObra);
        this.getObraRelacionada();
      }else{
        this.alert.create({
          title:"Error",
          message: "No se cargo la información de la obra."
        }).present();
      }
      
    }).catch(err=>{
      this.alert.create({
        title:"Error",
        message: JSON.stringify(err)
      }).present();
    });
  }

  getObraRelacionada(){
    this.servicioObra.getObraRelacionada(this.modeloObra.strIdSala,this.modeloObra._id).then((response:any)=>{
      if(response.intStatus == 1){
        this.arrayModeloObra = response.jsnAnswer;
        console.log(this.arrayModeloObra);
      }else{
        this.alert.create({
          title:"Error",
          message: "No se cargaron obras relacionadas."
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
