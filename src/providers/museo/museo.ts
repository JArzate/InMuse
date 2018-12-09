import { API_URL, HTTPOptions } from './../../config/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PreguntaModelo } from '../../modelos/pregunta-model';

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

  getMuseos = () => {
    return this.http.get(API_URL + "/listaMuseo" ,HTTPOptions).toPromise();
  }

  getEncuesta = (idMuseo:string) =>{
    return this.http.get(API_URL + "/encuesta/" + idMuseo ,HTTPOptions).toPromise();
  }

  setEncuesta = (strIdMuseo:string, strIdColeccion:string, strColeccion:string,arrayPreguntas:Array<PreguntaModelo>) =>{
    return this.http.post(API_URL + "/encuesta/",{'strIdMuseo':strIdMuseo, 'strIdColeccion':strIdColeccion, 'strColeccion':strColeccion,'arrayPreguntas':arrayPreguntas},HTTPOptions).toPromise();
  }

  setFeedback = (strIdMuseo:string, strIdColeccion:string, strColeccion:string, strComentario:string, strEmocion:string)=>{
    return this.http.post(API_URL + "/feedback/",{'strIdMuseo':strIdMuseo, 'strIdColeccion':strIdColeccion, 'strColeccion':strColeccion,'strComentario':strComentario,'strEmocion':strEmocion},HTTPOptions).toPromise();
  }

}
