import { MuseoProvider } from './../../providers/museo/museo';
import { UsuarioModelo } from './../../modelos/usuario-model';
import { AcertijoPage } from './../acertijo/acertijo';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { RecorridoProvider } from '../../providers/recorrido/recorrido';
import { RecorridoModelo } from '../../modelos/recorrido-model';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { MuseoModelo } from '../../modelos/museo-model';

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
  museo:MuseoModelo;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public recorridoProvider:RecorridoProvider,
    private alert:AlertController,
    public storage:Storage,
    private usuarioProvider:UsuarioProvider,
    private museoProvider:MuseoProvider
    ) {
      this.arrayModeloRecorrido = new Array<RecorridoModelo>();

  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.user = this.usuarioProvider.user;
    this.museo = this.museoProvider.museo;
  }

  ionViewDidLoad() {
    this.storage.get('usuario').then((usuario:any)=>{
      this.usuarioProvider.user = usuario;
      this.user = usuario;
    });

    console.log(this.user);
    console.log(this.navParams.get('idMuseo'));
      
    
    if (this.user != null && this.navParams.get('idMuseo')){
      this.getRecorrido(this.navParams.get('idMuseo'));
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
            handler:()=>{
              this.navCtrl.pop();
            }
          }
        ]
      }).present();
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

  getRecorrido = (idMuseo:string) => {
    this.recorridoProvider.getListaRecorridos(idMuseo,this.user._id).then((response:any)=>{
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
