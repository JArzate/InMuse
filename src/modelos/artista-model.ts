// var artista = Joi.object().keys({
//     _id: Joi.string().min(24),
//     strNombre: Joi.string(),
//     dteNacimiento: Joi.date(),
//     arrayStrDatosCuriosos: Joi.array().items(Joi.string()),
//     arrayStrImagen: Joi.array().items(Joi.string()),
//     strAudioDescripcion: Joi.string(),
//     blnActivo: Joi.boolean()
// }).required();

export class ArtistaModelo{
    _id?:String;
    strIdMuseo:String;
    strNombre:String;
    dteNacimiento:Date = new Date();
    arrayStrDatosCuriosos?:Array<String> = [''];
    arrayStrImagen:Array<String> = new Array();
    strAudioDescripcion?: String;
    blnActivo: Boolean = true;;
    blnDestacadaMuseo:Boolean = false;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}