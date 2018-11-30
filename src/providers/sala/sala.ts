import { API_URL, HTTPOptions } from './../../config/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SalaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SalaProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SalaProvider Provider');
  }

  getSala = (idSala:String) => {
    return this.http.get(API_URL + "/obra/" + idSala,HTTPOptions ).toPromise();
  }

  getSalas = ( idMuseo:String) => {
    return this.http.get(API_URL + "/sala/" + idMuseo,HTTPOptions ).toPromise();
  }

}
