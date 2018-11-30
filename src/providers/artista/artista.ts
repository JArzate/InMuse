import { API_URL, HTTPOptions } from './../../config/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ArtistaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ArtistaProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ArtistaProvider Provider');
  }

  getArtistasDestacados = (idMuseo:String) => {
    return this.http.get(API_URL + "/museolistaEventos/" + idMuseo, HTTPOptions).toPromise();
  }

}
