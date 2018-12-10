import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { SalaProvider } from '../../providers/sala/sala';
import { SalaModelo } from '../../modelos/sala-model';
import { SalaPage } from '../sala/sala';

/**
 * Generated class for the SalasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-salas',
  templateUrl: 'salas.html',
})
export class SalasPage {
  public arrayModeloSala: Array<SalaModelo>;
  public idMuseo: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public salaProvider:SalaProvider,
    private alert:AlertController,
    private loadingCtr:LoadingController
  ) {
    this.arrayModeloSala = new Array<SalaModelo>();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalasPage');
    this.idMuseo = this.navParams.get('idMuseo');
    this.getSalas();
  }

  IrSala = (sala:SalaModelo) => {
    this.navCtrl.push(SalaPage,{'idSala':sala._id});
  }

  getSalas = () => {
    let loader = this.loadingCtr.create({
      content:"Cargando ..."
    });

    loader.present();
    this.salaProvider.getSalas(this.idMuseo).then((response:any)=>{
      loader.dismiss();
      if(response.intStatus == 1){
        this.arrayModeloSala = response.jsnAnswer;
      }else{
        this.alert.create({
          title:"Error",
          message: "No se encontraron salas"
        }).present();
      }
      
    }).catch(err=>{4
      loader.dismiss();
      this.alert.create({
        title:"Error",
        message: "Error al conectar con el servidor"
      }).present();
    });
  }

}
