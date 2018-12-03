import { API_URL, HTTPOptions } from './../../config/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MuseoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MuseoProvider {

  constructor(public http: HttpClient) {
    console.log('Hello MuseoProvider Provider');
  }

  getMuseo = (idMuseo:String) => {
    return this.http.get(API_URL + "/museo/" + idMuseo ,HTTPOptions).toPromise();
  }

}
