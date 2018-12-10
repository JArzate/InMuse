import { MuseoProvider } from './../../providers/museo/museo';
import { UsuarioProvider } from './../../providers/usuario/usuario';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Alert, LoadingController } from 'ionic-angular';
import { MuseoModelo } from '../../modelos/museo-model';
import { MuseoPage } from '../museo/museo';

/**
 * Generated class for the MuseosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-museos',
  templateUrl: 'museos.html',
})
export class MuseosPage {
  public arrayModeloMuseo: Array<MuseoModelo>;
  public idMuseo: string;
  private loader:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    private alert:AlertController,
    private loadingCtrl:LoadingController,
    private museoProvider:MuseoProvider
  ) {
    this.arrayModeloMuseo = new Array<MuseoModelo>();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalasPage');
    this.getMuseos();
  }

  IrMuseo = (museo:MuseoModelo) => {
    this.navCtrl.setRoot(MuseoPage,{'idMuseo':museo._id});
  }

  getMuseos = () => {
    this.loader = this.loadingCtrl.create({content:"Cargando"});
    this.loader.present();
    this.museoProvider.getMuseos().then((response:any)=>{
      console.log(JSON.stringify(response));
      this.loader.dismiss();
      if(response.intStatus == 1){
        this.arrayModeloMuseo = response.jsnAnswer;
      }else{
        this.alert.create({
          title:"Error",
          message: "No se encontraron museos"
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
