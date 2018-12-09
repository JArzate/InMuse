import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { MuseoProvider } from '../../providers/museo/museo';

/**
 * Generated class for the FeedbackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  avg: number;
  iconSelected: string = '';
  comment: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public museoProvider: MuseoProvider,private alert:AlertController) {
    this.avg =0;
    this.comment = "";
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
  }

  onModelChange($event){
    console.log(this.avg);
  }

  sendComment(){
    console.log(this.comment);
    this.museoProvider.setFeedback('5bfa3b92157fa1127215cb9f','5bfa3b92157fa1127215cb9f','museo',this.comment,this.iconSelected).then((response:any) =>{

    }).catch(err=>{
      this.alert.create({
        title:"Error",
        message: JSON.stringify(err)
      }).present();
    });
  }

}
