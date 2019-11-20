
//Modelo para definir que campo queremos guardar un dato
const { Schema, model } = require('mongoose');  //Schema => Como queremos que sean los datos(tipo de datos)    
//model => Como mongodb va a consultar, actualizar los datos

const userSchema = new Schema(
  {
    username: {
      type: String,   //El tipo de dato 
      required: true, //El llenado de dos en este campo es obligatorio
      unique: true,   //Evita tener espacios innecesarios
      trim: true      //Verifica que los usuarios no se repitan
    }
  }, {
  timestamps: true//Cuando se cree un dato, se guarde de forma automatica la fecha de creacion, actualizacion
});

module.exports = model('User', userSchema);