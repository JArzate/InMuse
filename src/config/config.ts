import { UsuarioModelo } from './../modelos/usuario-model';
import { HttpHeaders } from '@angular/common/http';

export const API_URL: String = "http://ec2-13-58-96-6.us-east-2.compute.amazonaws.com:6002/api/usuario";
//export const API_URL: String = "http://192.168.1.70:6002/api/usuario";
export const HTTPOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
}

export let user:UsuarioModelo;
