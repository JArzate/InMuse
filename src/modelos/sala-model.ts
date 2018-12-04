import { ObraModelo } from './obra-model';
import { ArtistaModelo } from './artista-model';

export class SalaModelo{
    _id?:String;
    strIdMuseo:String;
    strNombre:String;
    strDescripcion:String;
    strAudioDescripcion?:String;
    dteCreacion:Date = new Date();
    arrayStrDatosCuriosos?:Array<String> = [""];
    arrayStrImagen:Array<String> = new Array();
    blnDestacadaMuseo:Boolean = false;
    blnActivo: Boolean = true;
    arrayModeloArtista:Array<ArtistaModelo> = Array();
    arrayModeloObra:Array<ObraModelo> = Array();
    arrayModeloObraDestacada:Array<ObraModelo> = Array();
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}