
//Modelo para definir que campo queremos guardar un dato

const { Schema, model } = require('mongoose');  //Schema => Como queremos que sean los datos(tipo de datos)    
                                                //model => Como mongodb va a consultar, actualizar los datos

//Los datos que estaremos guardando en la base de datos
const noteSchema = new Schema(
  {
    title: String,  //El titulo
    content: { 
      type: String, //El tipo de dato que debera tener
      required: true //El campo es obligatorio
    },
    author: { 
      type: String 
    },
    date: Date
  }, {
  timestamps: true//Cuando se cree un dato, se guarde de forma automatica la fecha de creacion, actualizacion
});

module.exports = model('Note', noteSchema);