import { ArtistaModelo } from './artista-model';
// var obra = Joi.object().keys({
//     _id: Joi.string().min(24),
//     strIdSala: Joi.string(),
//     strTitulo: Joi.string(),
//     arrayStrIdArtista: Joi.array().items(Joi.string()),
//     strDescripcion: Joi.string(),
//     strAudioDescripcion: Joi.string(),
//     strCorrienteArtistica: Joi.string(),
//     strTiempoHistorico: Joi.string(),
//     strMaterial: Joi.string(),
//     arrayStrDatosCuriosos: Joi.array().items(Joi.string()),
//     dteCreacion: Joi.date(),
//     arrayStrImagen: Joi.array().items(Joi.string()),
//     arrayStrIdFeedback: Joi.array().items(Joi.string()),
//     blnActivo: Joi.boolean()
// }).required();

export class ObraModelo{
    _id?:String = "";
    strIdSala:String = "";
    strIdMuseo:String = "";
    strTitulo:String = "";
    arrayModeloArtista:Array<ArtistaModelo> = Array();
    arrayStrIdArtista:Array<String> = Array();
    strDescripcion:String = "";
    strAudioDescripcion?:String = "";
    arrayStrDatosCuriosos?:Array<String> = [""];
    dteCreacion:Date = new Date();
    arrayStrImagen:Array<String> = Array();
    blnActivo: Boolean = true;
    blnDestacadaSala:Boolean =false;
    blnDestacadaMuseo:Boolean = false;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}