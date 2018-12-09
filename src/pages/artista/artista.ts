import { ArtistaProvider } from './../../providers/artista/artista';
import { ArtistaModelo } from './../../modelos/artista-model';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { StreamingAudioOptions, StreamingMedia } from '@ionic-native/streaming-media';

/**
 * Generated class for the ArtistaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({ 
  selector: 'page-artista',
  templateUrl: 'artista.html',
})
export class ArtistaPage {
  artista:ArtistaModelo;

  constructor(
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public artistaProvider:ArtistaProvider, 
      public loadingCtrl:LoadingController,
      public alertCtrl:AlertController,
      private streamingMedia: StreamingMedia) {
        this.artista = new ArtistaModelo();
      }
      
    ionViewDidLoad() {
        if (this.navParams.get('idArtista')){
          this.getArtista(this.navParams.get('idArtista'));
        }else{
          this.navCtrl.pop();
        }
  }

  getArtista = (idArtista:string) => {
    let loader = this.loadingCtrl.create({
      content:"Cargando ..."
    });

    loader.present();
    this.artistaProvider.getArtista(idArtista).then((response:any)=>{
      loader.dismiss();

      if (response.intStatus == 1){
        this.artista = response.jsnAnswer;
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

  reproducirAudio = () => {
    console.log("va a reproducir");
    let options: StreamingAudioOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      bgImage: this.artista.arrayStrImagen[0]
    };
    this.streamingMedia.playAudio(this.artista.strAudioDescripcion,options);
  }

}
