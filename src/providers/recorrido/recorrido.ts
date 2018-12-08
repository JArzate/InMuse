import { API_URL, HTTPOptions } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SalaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RecorridoProvider {

  constructor(public http: HttpClient) {
    console.log('Hello SalaProvider Provider');
  }

  getListaRecorridos = (idMuseo:string,idUsuario:string) => {
    return this.http.get(API_URL + "/listaRecorrido/" + idMuseo + "/" + idUsuario,HTTPOptions ).toPromise();
  }

  getRecorrido = ( idRecorrido:string, idUsuario:string) => {
    return this.http.get(API_URL + "/recorrido/" + idRecorrido + "/" + idUsuario,HTTPOptions ).toPromise();
  }

}
