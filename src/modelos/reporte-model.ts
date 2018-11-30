// var reporte = Joi.object().keys({
//     _id: Joi.string(),
//     strIdMuseo: Joi.string(),
//     arrayTmspVisita: Joi.array().items(Joi.date()),
//     arrayModeloMotivoVisita: Joi.array().items(motivoVisita)
// }).required();

export class MotivoModelo{
    _id?: String;
    strIdMuseo: String;
    arrayTmspVisita: Array<Date>;
    arrayModeloMotivoVisita: Array<MotivoModelo>

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}