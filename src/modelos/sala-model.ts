import { ObraModelo } from './obra-model';
import { ArtistaModelo } from './artista-model';

export class SalaModelo{
    _id?:string;
    strIdMuseo:string;
    strNombre:string;
    strDescripcion:string;
    strAudioDescripcion?:string;
    dteCreacion:Date = new Date();
    arrayStrDatosCuriosos?:Array<string> = [""];
    arrayStrImagen:Array<string> = new Array();
    blnDestacadaMuseo:Boolean = false;
    blnActivo: Boolean = true;
    arrayModeloArtista:Array<ArtistaModelo> = Array();
    arrayModeloObra:Array<ObraModelo> = Array();
    arrayModeloObraDestacada:Array<ObraModelo> = Array();
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}