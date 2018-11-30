import { PreguntaModelo } from './pregunta-model';
import { SalaModelo } from './sala-model';
import { ArtistaModelo } from './artista-model';
import { ObraModelo } from "./obra-model";
// // Campos en front
// // arrayModeloObra
// // arrayModeloArtista
// var museo = Joi.object().keys({
//     _id: Joi.string().min(24),
//     strNombre: Joi.string(),
//     strDescripcion: Joi.string(),
//     strAudioDescripcion: Joi.string(),
//     dteCreacion: Joi.date(),
//     arrayStrNombreFundador: Joi.array().items(Joi.string()),
//     arrayStrDatosCuriosos: Joi.array().items(Joi.string()),
//     arrayStrImagen: Joi.array().items(Joi.string()),
//     arrayStrIdFeedback: Joi.array().items(Joi.string()),
//     arrayStrIdObra: Joi.array().items(Joi.string()),
//     arrayStrIdArtista: Joi.array().items(Joi.string()),
//     blnActivo: Joi.boolean()
// }).required();

export class MuseoModelo{
    _id?:String = "";
    strNombre:String = "";
    strDescripcion:String = "";
    strAudioDescripcion?:String = "";
    dteCreacion:Date = new Date();
    arrayStrNombreFundador:Array<String> = [''];
    arrayStrDatosCuriosos?:Array<String> = [''];
    arrayStrImagen:Array<String> = new Array();
    arrayStrIdArtista?:Array<String> = new Array();
    arrayStrPreguntas?:Array<PreguntaModelo> = new Array();
    blnActivo: Boolean = true;
    arrayModeloObra : Array<ObraModelo>
    arrayModeloArtista : Array<ArtistaModelo>
    arrayModeloSala : Array<SalaModelo>

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}