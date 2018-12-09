import { Storage } from '@ionic/storage';
import { HomePage } from './../home/home';
import { UsuarioProvider } from './../../providers/usuario/usuario';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioModelo } from './../../modelos/usuario-model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  usuario:UsuarioModelo;
  form:FormGroup;
  constructor(public storage:Storage,public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams,public formBuilder:FormBuilder, public usuarioProvider:UsuarioProvider) {
    this.usuario = new UsuarioModelo();

      this.form = this.formBuilder.group({
        nombre:['',Validators.required],
        apellido:[''],
        correo: ['', [Validators.required,Validators.email]],
        password: ['', Validators.required]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistroPage');

  }

  submit = () => {
    this.usuarioProvider.register(this.usuario).then((response:any)=>{
      if (response.intStatus == 1 ){
        this.storage.set('usuario',JSON.stringify(this.usuario));
        this.alertCtrl.create({
          title:"Acción realizada",
          message:"Usuario creado exitosamente"
        }).present().then(()=>{
          this.navCtrl.setRoot(HomePage);
        });
      }
    }).catch((error)=>{
      this.alertCtrl.create({
        title:"Error",
        message:"Ocurrio un error con la conexión al servidor"
      }).present();
    });
  }

}
