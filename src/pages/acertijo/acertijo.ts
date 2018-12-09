import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { RecorridoProvider } from '../../providers/recorrido/recorrido';
import { RecorridoModelo } from '../../modelos/recorrido-model';
import { PistaModelo } from '../../modelos/pista-model';

/**
 * Generated class for the AcertijoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-acertijo',
  templateUrl: 'acertijo.html',
})
export class AcertijoPage {
  public recorrido: RecorridoModelo;
  public pista : PistaModelo;
  public actual : number;
  facil:boolean;
  scanSub:any;

  qrData = null;
  createdCode = null;
  scannedCode = null;
  strIdRecorrido:string;
  strIdUsuario:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    public recorridoProvider:RecorridoProvider,
    private alert:AlertController) {
    this.facil = false;
    this.pista = new PistaModelo();
    this.recorrido = new RecorridoModelo();
    this.actual = 0;
  }

  ionViewDidLoad() {

    this.strIdRecorrido = this.navParams.get('idRecorrido');
    this.strIdUsuario = this.navParams.get('idUsuario');


    this.getRecorrido();
  }

  getRecorrido(){
    this.recorridoProvider.getRecorrido(this.strIdRecorrido,this.strIdUsuario).then((response:any) =>{
      this.recorrido = new RecorridoModelo(response.jsnAnswer);
      this.pista = new PistaModelo(this.recorrido.arrayModeloPista[this.recorrido.intPistaActual]);
      console.log(this.recorrido);
      
    }).catch(err=>{
      this.alert.create({
        title:"Error",
        message: JSON.stringify(err)
      }).present();
    });
  }

  verImagen(){
    this.facil = !this.facil;
    console.log(this.facil);
  }

  escanear() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      this.createdCode = this.scannedCode;
      console.log('strIdObra ',this.pista.strIdObra);
      console.log('scaned ',this.scannedCode);
      console.log('created ',this.createdCode);
      let recibe = JSON.parse(this.createdCode);
      if(recibe.strIdObra == this.pista.strIdObra){
        this.alert.create({
          title:"¡Bien!",
          message: 'Cada vez eres más astuto, felicidades.'
        }).present();
        this.recorridoProvider.actualizaRecorrido(this.strIdRecorrido,this.strIdUsuario,this.recorrido.intPistaActual+1).then((response:any) =>{
          if(response.intStatus==1){
            console.log('Entro 1');
            this.getRecorrido();
          }else{
            console.log('Entro 2');
          }
          
        }).catch(err=>{
          this.alert.create({
            title:"Error",
            message: JSON.stringify(err)
          }).present();
        });
      }else{
        this.alert.create({
          title:"Error",
          message: 'Haz fallado, intenta con otra obra.'
        }).present();
      }
    }, (err) => {
        console.log('Error: ', err);
    });
  }


}
