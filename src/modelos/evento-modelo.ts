export class EventoModelo{
    _id?:String;
    strIdMuseo:String;
    strNombre:String;
    strDescripcion:String;
    dteCreacion:Date = new Date();
    arrayStrImagen:Array<String> = new Array();
    blnDestacadaMuseo:Boolean = false;
    blnActivo: Boolean = true;
        
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}