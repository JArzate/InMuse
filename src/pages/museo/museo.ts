import { SalaPage } from './../sala/sala';
import { SalaModelo } from './../../modelos/sala-model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { MuseoProvider } from '../../providers/museo/museo';
import { MuseoModelo } from '../../modelos/museo-model';
import {Platform} from 'ionic-angular';
import { StreamingMedia, StreamingAudioOptions } from '@ionic-native/streaming-media';
import { SalasPage } from '../salas/salas';
import { EncuestaPage } from '../encuesta/encuesta';
import { FeedbackPage } from '../feedback/feedback';
import { LoginPage } from '../login/login';
import { UsuarioModelo } from '../../modelos/usuario-model';
import { Storage } from '@ionic/storage';
import { RecorridosPage } from '../recorridos/recorridos';
import { ObraModelo } from '../../modelos/obra-model';
import { ObraPage } from '../obra/obra';

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
  idMuseo: string;
  user:UsuarioModelo = new UsuarioModelo();
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public servicioMuseo: MuseoProvider,
    private alert:AlertController,
    private loadingCtrl:LoadingController,
    private platform:Platform,
    private streamingMedia: StreamingMedia,
    public storage:Storage
    ) {
      this.modeloMuseo = new MuseoModelo();
      this.idMuseo = this.navParams.get('idMuseo');
      
      if (this.storage.get('usuario')){
        this.storage.get('usuario').then((usuario:any)=>{
          this.user = new UsuarioModelo(usuario);
        });
      }
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

  IrSalas = () => {
    this.navCtrl.push(SalasPage,{'idMuseo':this.modeloMuseo._id});
  }

  getMuseo(){
    let loader = this.loadingCtrl.create({
      content:"Cargando ..."
    });

    loader.present();
    this.servicioMuseo.getMuseo(this.idMuseo).then((response:any) =>{
      loader.dismiss();
      console.log(response);
      this.modeloMuseo = new MuseoModelo(response.jsnAnswer);
      this.navCtrl.push(EncuestaPage,{"idMuseo":this.modeloMuseo._id});
      console.log('Museo: '+JSON.stringify(this.modeloMuseo));
    }).catch(err=>{
      loader.dismiss();
      this.alert.create({
        title:"Error",
        message: JSON.stringify(err)
      }).present();
    });
  }

  irSala = (sala:SalaModelo) =>  {
    console.log(sala);
    this.navCtrl.push(SalaPage,{'idSala':sala._id});
  }

  irObra = (obra:ObraModelo) =>  {
    console.log(obra);
    this.navCtrl.push(ObraPage,{'idObra':obra._id});
  }

  IrFeedback(){
    this.navCtrl.push(FeedbackPage,{
      'idMuseo':this.modeloMuseo._id,
      'idColeccion':this.modeloMuseo._id,
      'strColeccion':"museo",
      'strTitulo': this.modeloMuseo.strNombre,
      'strImagen': this.modeloMuseo.arrayStrImagen[0]
    })
  }

  IrRecorridos(){
    this.navCtrl.push(RecorridosPage,{'idMuseo':this.modeloMuseo._id});
  }
  
  irLoginPage = () => {
    this.navCtrl.push(LoginPage,{'blnMuseo':true});
  }

  logOut = () =>{
    this.storage.remove('usuario').then(()=>{
      this.user = null;
    });
  }

}
