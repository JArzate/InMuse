import { ArtistaPage } from './../artista/artista';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { ObraModelo } from '../../modelos/obra-model';
import { ObraProvider } from '../../providers/obra/obra';
import { StreamingMedia, StreamingAudioOptions } from '@ionic-native/streaming-media';
import { ArtistaModelo } from '../../modelos/artista-model';
import { RecorridosPage } from '../recorridos/recorridos';
import { FeedbackPage } from '../feedback/feedback';

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
    private streamingMedia: StreamingMedia,
    private loadingCtrl:LoadingController,
    ) {
    this.modeloObra = new ObraModelo();
    this.arrayModeloObra = new Array();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ObraPage');
    if (this.navParams.get('idObra')){
      this.getObra(this.navParams.get('idObra'));
    }else{
      this.navCtrl.pop();
    }
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

  getObra(idObra:string){
    let loader = this.loadingCtrl.create({
      content:"Cargado ..."
    });

    loader.present();
    this.servicioObra.getObra(idObra).then((response:any)=>{
      loader.dismiss();
      if(response.intStatus == 1){
        this.modeloObra = new ObraModelo(response.jsnAnswer);
        console.log(response.jsnAnswer,"Aaaaaaa");
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

  irArtista = (artista:ArtistaModelo) => {
    console.log(artista);
    this.navCtrl.push(ArtistaPage,{idArtista:artista._id});
  }

  IrFeedback(){
    this.navCtrl.push(FeedbackPage,{
      'idMuseo':this.modeloObra.strIdMuseo,
      'idColeccion':this.modeloObra._id,
      'strColeccion':"obra",
      'strTitulo': this.modeloObra.strTitulo,
      'strImagen': this.modeloObra.arrayStrImagen[0]
    })
  }

  irObra = (obra:ObraModelo) => {
    this.navCtrl.push(ObraPage,{idObra:obra._id});
  }

  IrRecorridos = () => {
    this.navCtrl.push(RecorridosPage,{idMuseo:this.modeloObra.strIdMuseo});
  }

}
