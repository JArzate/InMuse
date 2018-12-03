import { PreguntaModelo } from './pregunta-model';
import { SalaModelo } from './sala-model';
import { ArtistaModelo } from './artista-model';
import { ObraModelo } from "./obra-model";


export class MuseoModelo{
    _id?:String = "";
    strNombre:String = "";
    strDescripcion:string = "";
    strAudioDescripcion?:string = "";
    dteCreacion:Date = new Date();
    arrayStrNombreFundador:Array<string> = [''];
    arrayStrDatosCuriosos?:Array<string> = new Array();
    arrayStrImagen:Array<string> = new Array();
    arrayStrIdArtista?:Array<string> = new Array();
    arrayStrPreguntas?:Array<PreguntaModelo> = new Array();
    blnActivo: Boolean = true;
    arrayModeloObra : Array<ObraModelo>= new Array();
    arrayModeloArtista : Array<ArtistaModelo>= new Array();
    arrayModeloSala : Array<SalaModelo>= new Array();

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}