// var motivoVisita = Joi.object().keys({
//     strOrigen: Joi.string(),
//     intEdad: Joi.number(),
//     strMotivo: Joi.string()
// }).required();

export class MotivoModelo{
    strOrigen: String;
    intEdad: Number;
    strMotivo: String;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}