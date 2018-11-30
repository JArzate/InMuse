// var pregunta = Joi.object().keys({
//     strPregunta: Joi.string().required(),
//     strRespuesta: Joi.string().required()
// }).required();

export class PreguntaModelo{
    strPregunta:String = "";
    strRespuesta:String = "";
    strTipo:String = "";
    arrayStrOpciones?:Array<String> = new Array();;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}