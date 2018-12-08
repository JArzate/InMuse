// var pregunta = Joi.object().keys({
//     strPregunta: Joi.string().required(),
//     strRespuesta: Joi.string().required()
// }).required();

export class PreguntaModelo{
    strPregunta:string = "";
    strRespuesta:string = "";
    strTipo:string = "";
    arrayStrOpciones?:Array<string> = new Array();;
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}