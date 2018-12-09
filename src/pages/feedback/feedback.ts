import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { MuseoProvider } from '../../providers/museo/museo';

/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  avg: number;
  iconSelected: string = '';
  comment: string;
  idMuseo:string;
  idColeccion:string;
  strColeccion:string;
  strImagen:string;
  strTitulo: string;
  private loader:any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public museoProvider: MuseoProvider,
    private alert:AlertController,
    private loadingCtrl:LoadingController) {
      this.avg =0;
      this.comment = "";
      this.idMuseo = this.navParams.get('idMuseo');
      this.idColeccion = this.navParams.get('idColeccion');
      this.strColeccion = this.navParams.get('strColeccion');
      this.strImagen = this.navParams.get('strImagen');
      this.strTitulo = this.navParams.get('strTitulo');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }

  onModelChange($event){
    console.log(this.avg);
  }

  sendComment(){
    console.log(this.comment);
    this.loader = this.loadingCtrl.create({content:"Cargando"});
    this.loader.present();
    this.museoProvider.setFeedback(this.idMuseo,this.idColeccion,this.strColeccion,this.comment,this.iconSelected).then((response:any) =>{
      this.loader.dismiss();
      if(response.intStatus == 1){
        this.alert.create({
          title: 'Gracias',
          message: 'Tus comentarios nos ayudan mucho :D',
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

}
