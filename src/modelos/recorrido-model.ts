import { PistaModelo } from "./pista-model";

export class RecorridoModelo{
    _id?:string;
    strIdMuseo:string;
    dteCreacion:Date = new Date();
    strNombre:string;
    strDescripcion:string;
    arrayModeloPista?:Array<PistaModelo> = new Array();
    intPistaActual?:number = 0;
    intPistaTotal:number;
    strEstatus:string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}