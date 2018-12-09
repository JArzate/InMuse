import { UsuarioModelo } from './../../modelos/usuario-model';
import { AcertijoPage } from './../acertijo/acertijo';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { RecorridoProvider } from '../../providers/recorrido/recorrido';
import { RecorridoModelo } from '../../modelos/recorrido-model';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

/**
 * Generated class for the RecorridosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-recorridos',
  templateUrl: 'recorridos.html',
})
export class RecorridosPage {

  public arrayModeloRecorrido: Array<RecorridoModelo>;
  user:UsuarioModelo;
  strIdMuseo:string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public recorridoProvider:RecorridoProvider,
    private alert:AlertController,
    public storage:Storage
    ) {
      this.arrayModeloRecorrido = new Array<RecorridoModelo>();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecorridosPage');
    if (this.storage.get('usuario')){
      this.storage.get('usuario').then((usuario:any)=>{
        this.user = usuario;
        this.strIdMuseo = this.navParams.get('idMuseo');
        this.getRecorrido();
      });
    }else{
      this.navCtrl.pop();
    }
  }

  IrRecorrido(recorrido:RecorridoModelo){
    if (this.user){
      this.navCtrl.push(AcertijoPage,{idRecorrido:recorrido._id,idUsuario:this.user._id});
    }else{
      this.alert.create({
        title:"¡Hey!",
        message:"Necesitas iniciar sesión para continuar",
        buttons:[
          {
            text:"Iniciar sesión",
            handler:()=>{
              this.navCtrl.push(LoginPage);
            }
          },
          {
            text:"Cancelar",
            role:"cancel"
          }
        ]
      }).present();
    }
  }

  getRecorrido = () => {
    this.recorridoProvider.getListaRecorridos(this.strIdMuseo,this.user._id).then((response:any)=>{
      console.log(JSON.stringify(response));
      if(response.intStatus == 1){
        this.arrayModeloRecorrido = response.jsnAnswer;   
       }else{
        this.alert.create({
          title:"Error",
          message: "No se encontraron recorridos"
        }).present();
      }
      
    }).catch(err=>{
      this.alert.create({
        title:"Error",
        message: "Error al conectar con el servidor"
      }).present();
    });
  }

}
