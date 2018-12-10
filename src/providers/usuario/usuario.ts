import { UsuarioModelo } from './../../modelos/usuario-model';
import { API_URL, HTTPOptions } from './../../config/config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {
  public user:UsuarioModelo;
  constructor(public http: HttpClient, public storage:Storage) {
    console.log('Hello UsuarioProvider Provider');
  }

  logIn = (correo:String, password:String) => {
    return this.http.post(API_URL + "/login",{strCorreo:correo,strPassword:password},HTTPOptions).toPromise();
  }

  updateUsuario = (usuario:UsuarioModelo) => {
    return this.http.put(API_URL + "/usuario",{modeloUsuario:usuario},HTTPOptions).toPromise();
  }

  register = (usuario:UsuarioModelo) => {
    let usuarioRegistro={
        strNombre: usuario.strNombre,
        strApellido: usuario.strApellido,
        strCorreo: usuario.strCorreo,
        strPassword: usuario.strPassword
    }
    return this.http.post(API_URL + "/registro",usuarioRegistro).toPromise();
  }
  
}
