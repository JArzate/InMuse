import { UsuarioProvider } from './../../providers/usuario/usuario';
import { SalaPage } from './../sala/sala';
import { SalaModelo } from './../../modelos/sala-model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { MuseoProvider } from '../../providers/museo/museo';
import { MuseoModelo } from '../../modelos/museo-model';
import { Platform } from 'ionic-angular';
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
  public leer_mas: boolean = false;
  user: UsuarioModelo;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public servicioMuseo: MuseoProvider,
    private alert: AlertController,
    private loadingCtrl: LoadingController,
    private streamingMedia: StreamingMedia,
    public storage: Storage,
    private usuarioProvider: UsuarioProvider
  ) {

    this.modeloMuseo = new MuseoModelo();

    if (this.navParams.get('idMuseo')){
      this.storage.get('usuario').then((usuario: any) => {
        this.usuarioProvider.user = usuario;
      });
      this.getMuseo(this.navParams.get('idMuseo'));
    }else{
      this.navCtrl.pop();
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MuseoPage');
  }

  ngDoCheck(): void {
    this.modeloMuseo = this.servicioMuseo.museo;
    this.user = this.usuarioProvider.user;
  }

  reproducirAudio() {
    console.log("va a reproducir");
    let options: StreamingAudioOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      bgImage: this.modeloMuseo.arrayStrImagen[0]
    };
    this.streamingMedia.playAudio(this.modeloMuseo.strAudioDescripcion, options);
  }

  IrSalas = () => {
    this.navCtrl.push(SalasPage, { 'idMuseo': this.modeloMuseo._id });
  }

  getMuseo(idMuseo:string) {
    let loader = this.loadingCtrl.create({
      content: "Cargando ..."
    });

    loader.present();
    this.servicioMuseo.getMuseo(idMuseo).then((response: any) => {
      loader.dismiss();
      if (response.intStatus == 1){
        this.servicioMuseo.museo = response.jsnAnswer;
        console.log(this.servicioMuseo.museo,"museo");
        
        this.modeloMuseo = this.servicioMuseo.museo;
        this.storage.set('museo',response.jsnAnswer).then(()=>{
          if (this.modeloMuseo.arrayStrPreguntas && this.modeloMuseo.arrayStrPreguntas.length > 0) {
            this.navCtrl.push(EncuestaPage, { "idMuseo": this.modeloMuseo._id });
          }
        });
      }
    }).catch(err => {
      loader.dismiss();
      this.alert.create({
        title: "Error",
        message: JSON.stringify(err)
      }).present();
    });
  }

  irSala = (sala: SalaModelo) => {
    console.log(sala);
    this.navCtrl.push(SalaPage, { 'idSala': sala._id });
  }

  irObra = (obra: ObraModelo) => {
    console.log(obra);
    this.navCtrl.push(ObraPage, { 'idObra': obra._id });
  }

  IrFeedback() {
    this.navCtrl.push(FeedbackPage, {
      'idMuseo': this.modeloMuseo._id,
      'idColeccion': this.modeloMuseo._id,
      'strColeccion': "museo",
      'strTitulo': this.modeloMuseo.strNombre,
      'strImagen': this.modeloMuseo.arrayStrImagen[0]
    })
  }

}
