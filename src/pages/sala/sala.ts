import { ObraPage } from './../obra/obra';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { SalaModelo } from '../../modelos/sala-model';
import { SalaProvider } from '../../providers/sala/sala';
import { StreamingMedia, StreamingAudioOptions } from '@ionic-native/streaming-media';
import { ObraModelo } from '../../modelos/obra-model';
import { FeedbackPage } from '../feedback/feedback';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

/**
 * Generated class for the SalaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sala',
  templateUrl: 'sala.html',
})
export class SalaPage {
  public appear = false;
  public modeloSala:SalaModelo;
  public leer_mas:boolean = false;
  public idSala: string;
  qrData = null;
  createdCode = null;
  scannedCode = null;


  constructor(
    private loadingCtrl:LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private servicioSala: SalaProvider,
    private alert:AlertController,
    private streamingMedia: StreamingMedia,
    private barcodeScanner: BarcodeScanner
  ) {
    this.modeloSala = new SalaModelo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalaPage');
    if(this.navParams.get('idSala')){
      this.getSala(this.navParams.get('idSala'));
    }else{
      this.navCtrl.pop();
    }
  }

  reproducirAudio(){
    console.log("va a reproducir");
    let options: StreamingAudioOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      bgImage: this.modeloSala.arrayStrImagen[0]
    };
    this.streamingMedia.playAudio(this.modeloSala.strAudioDescripcion,options);
  }

  getSala(idSala:string){
    let loader = this.loadingCtrl.create({
      content:"Cargado ..."
    });

    loader.present();
    this.servicioSala.getSala(idSala).then((response:any)=>{
      loader.dismiss();
      if(response.intStatus == 1){
        this.modeloSala = new SalaModelo(response.jsnAnswer);
        console.log(this.modeloSala);
      }else{
        this.alert.create({
          title:"Error",
          message: "No se cargo la información de la sala."
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

  irObra = (obra:ObraModelo) => {
      this.navCtrl.push(ObraPage,{idObra:obra._id});
  }

  IrFeedback(){
    this.navCtrl.push(FeedbackPage,{
      'idMuseo':this.modeloSala.strIdMuseo,
      'idColeccion':this.modeloSala._id,
      'strColeccion':"sala",
      'strTitulo': this.modeloSala.strNombre,
      'strImagen': this.modeloSala.arrayStrImagen[0]
    })
  }

  escanearQr(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      this.createdCode = this.scannedCode;
      let recibe = JSON.parse(this.createdCode);
      if(recibe.strIdObra){
        this.navCtrl.push(ObraPage,{'idObra':recibe.strIdObra});
      }else{
        this.alert.create({
          title:"Error",
          message: 'No se ha podido obtener la información del codigo QR.'
        }).present();
      }
    }, (err) => {
        console.log('Error: ', err);
    });
  }

}
