import { HttpHeaders } from '@angular/common/http';

export const API_URL: String = "http://ec2-18-222-223-75.us-east-2.compute.amazonaws.com:6002/api/usuario";
//export const API_URL: String = "http://192.168.137.1:6001/api/admin";
export const HTTPOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
}