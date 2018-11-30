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

  getObrasSala = (idSala:String) => {
    return this.http.get(API_URL + "/obraSala/" + idSala,HTTPOptions).toPromise();
  }

  getObra = (idObra:String) => {
    return this.http.get(API_URL + "/obra/" + idObra,HTTPOptions ).toPromise();
  }

  





}
