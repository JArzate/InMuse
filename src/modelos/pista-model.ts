export class PistaModelo{
    strIdObra:string = "";
    strImagen:string = "";
    strPista:string = "";
    intPuntos:Number = 0;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}