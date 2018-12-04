import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MuseoProvider } from '../../providers/museo/museo';
import { MuseoModelo } from '../../modelos/museo-model';
import {Platform} from 'ionic-angular';
import { StreamingMedia, StreamingAudioOptions } from '@ionic-native/streaming-media';

/**
 * Generated class for the MuseoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-museo',
  templateUrl: 'museo.html',
})
export class MuseoPage {
  modeloMuseo: MuseoModelo;
  public leer_mas:boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public servicioMuseo: MuseoProvider,
    private alert:AlertController,
    private platform:Platform,
    private streamingMedia: StreamingMedia
    ) {
      this.modeloMuseo = new MuseoModelo();
      this.getMuseo(); 
      
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MuseoPage');
  }

  reproducirAudio(){
    console.log("va a reproducir");
    let options: StreamingAudioOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      bgImage: this.modeloMuseo.arrayStrImagen[0]
    };
    this.streamingMedia.playAudio(this.modeloMuseo.strAudioDescripcion,options);
  }

  getMuseo(){
    this.servicioMuseo.getMuseo('5bfa3b92157fa1127215cb9f').then((response:any) =>{
      console.log(response);
      this.modeloMuseo = new MuseoModelo(response.jsnAnswer);
      console.log('Museo: '+JSON.stringify(this.modeloMuseo));
      
     
    }).catch(err=>{
      this.alert.create({
        title:"Error",
        message: JSON.stringify(err)
      }).present();
    });
  }

}
