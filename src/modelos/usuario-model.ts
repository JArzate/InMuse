// var usuario = Joi.object().keys({
//     _id: Joi.string().min(24),
//     strNombre: Joi.string(),
//     strApellido: Joi.string(),
//     strCorreo: Joi.string(),
//     dteNacimiento: Joi.date(),
//     strPassword: Joi.string(),
//     intPuntaje: Joi.number()
// }).required();

export class UsuarioModelo{
    _id:String;
    strNombre:String = "";
    strApellido?:String = "";
    strCorreo:String = "";
    dteNacimiento:Date = new Date(); 
    strPassword:String = "";
    intPuntaje?:Number = 0;
    strRol:String = "usuario";
    blnPremium:Boolean = false;
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}