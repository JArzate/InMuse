import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SalaModelo } from '../../modelos/sala-model';
import { SalaProvider } from '../../providers/sala/sala';
import { StreamingMedia, StreamingAudioOptions } from '@ionic-native/streaming-media';

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
  modeloSala:SalaModelo;
  public leer_mas:boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private servicioSala: SalaProvider,
    private alert:AlertController,
    private streamingMedia: StreamingMedia
  ) {
    this.modeloSala = new SalaModelo();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalaPage');
    this.getSala();
  }


  ngOnInit(): void {
    //this.loadMap();
    
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

  getSala(){
    this.servicioSala.getSala("5bfa3edad70db0138e4f693b").then((response:any)=>{
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
      this.alert.create({
        title:"Error",
        message: JSON.stringify(err)
      }).present();
    });
  }
}
