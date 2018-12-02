import { API_URL, HTTPOptions } from './../../config/config';
import { EventoModelo } from './../../modelos/evento-modelo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*
  Generated class for the EventoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventoProvider {

  constructor(public http: HttpClient) {
    console.log('Hello EventoProvider Provider');
  }

  getEventosMes = (mes:String) => {
    return this.http.get(API_URL + "/museolistaEventos/" + mes,HTTPOptions).toPromise();
  }

  getEventosProximos = () => {
    return this.http.get(API_URL + "/listaEventos", HTTPOptions).toPromise();
  }

  getEvento = (idEvento:String) => {
    return this.http.get(API_URL + "/museolistaEventos/" + idEvento, HTTPOptions).toPromise();
  }

}
