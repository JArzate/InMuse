import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController,
    public servicioMuseo: MuseoProvider, 
    private alert:AlertController,
    public formBuilder: FormBuilder,
    public navParams: NavParams) {
      this.modeloMuseo = new MuseoModelo();
      this.preguntas = new Array<PreguntaModelo>();
  }

  ionViewDidLoad() {
    this.getMuseo();
    this.getEncuesta();
  }

  getMuseo(){
    this.servicioMuseo.getMuseo('5bfa3b92157fa1127215cb9f').then((response:any) =>{
      this.modeloMuseo = new MuseoModelo(response.jsnAnswer);
      
     
    }).catch(err=>{
      this.alert.create({
        title:"Error",
        message: JSON.stringify(err)
      }).present();
    });
  }

  continuar(){
    console.log("Respuestas",this.preguntas);
    this.servicioMuseo.setEncuesta('5bfa3b92157fa1127215cb9f','5bfa3b92157fa1127215cb9f','museo',this.preguntas).then((response:any) =>{

    }).catch(err=>{
      this.alert.create({
        title:"Error",
        message: JSON.stringify(err)
      }).present();
    });
  }

  getEncuesta(){
    this.servicioMuseo.getEncuesta('5bfa3b92157fa1127215cb9f').then((response:any) =>{
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
