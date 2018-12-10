import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MuseoModelo } from '../../modelos/museo-model';
import { MuseoProvider } from '../../providers/museo/museo';
import { PreguntaModelo } from '../../modelos/pregunta-model';

/**
 * Generated class for the EncuestaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-encuesta',
  templateUrl: 'encuesta.html',
})
export class EncuestaPage {
  modeloMuseo: MuseoModelo;
  preguntas: Array<PreguntaModelo>;
  modeloPregunta: PreguntaModelo;
  form: FormGroup;
  idMuseo:string;
  constructor(public navCtrl: NavController,
    public servicioMuseo: MuseoProvider, 
    private alert:AlertController,
    public formBuilder: FormBuilder,
    public navParams: NavParams) {
      this.modeloMuseo = new MuseoModelo();
      this.preguntas = new Array<PreguntaModelo>();
      this.idMuseo = this.navParams.get('idMuseo');
  }

  ionViewDidLoad() {
    this.getMuseo();
    this.getEncuesta();
  }

  getMuseo(){
    this.servicioMuseo.getMuseo(this.idMuseo).then((response:any) =>{
      this.modeloMuseo = new MuseoModelo(response.jsnAnswer);
      
     
    }).catch(err=>{
      this.alert.create({
        title:"Error",
        message: JSON.stringify(err)
      }).present();
    });
  }

  continuar(){
    this.servicioMuseo.setEncuesta(this.idMuseo,this.idMuseo,'museo',this.preguntas).then((response:any) =>{
        if(response.intStatus == 1){
          this.alert.create({
            title: '¡Gracias!',
            message: 'Tus respuestas nos sirven mucho :)',
            enableBackdropDismiss: false,
            buttons: [
              {
                text: 'Ok',
                handler: () => {
                  this.navCtrl.pop();
                }
              }
            ]
          }).present();
        }else{
          this.alert.create({title:"Error",message:response.strAnswer}).present();
        }
    }).catch(err=>{
      this.alert.create({
        title:"Error",
        message: JSON.stringify(err)
      }).present();
    });
  }

  getEncuesta(){
    this.servicioMuseo.getEncuesta(this.idMuseo).then((response:any) =>{
      //this.preguntas = response.jsnAnswer;
      console.log('Encuesta: ',this.preguntas);
      response.jsnAnswer.forEach(element => {
        this.preguntas.push(new PreguntaModelo(element));
      });
     
    }).catch(err=>{
      this.alert.create({
        title:"Error",
        message: JSON.stringify(err)
      }).present();
    });
  }

}
