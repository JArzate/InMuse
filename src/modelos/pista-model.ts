export class PistaModelo{
    strIdObra:String = "";
    strImagen:String = "";
    strNombreObra:String = "";
    strPista:String = "";
    intPuntos:Number = 0;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}