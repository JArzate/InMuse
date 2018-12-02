import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  comment: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
  }

}
