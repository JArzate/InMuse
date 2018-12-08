import { API_URL, HTTPOptions } from './../../config/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ObraProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ObraProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ObraProvider Provider');
  }

  getObra = (idObra:String) => {
    return this.http.get(API_URL + "/obra/" + idObra,HTTPOptions ).toPromise();
  }

  getObraRelacionada = (idSala:String,idObra:String) => {
    return this.http.get(API_URL + "/obraRelacionada/"+ idSala+"/" + idObra,HTTPOptions ).toPromise();
  }

  





}
