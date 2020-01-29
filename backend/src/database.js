
/*
  ?En este archivo unicamente inicamos el servidor
  ?y lo conectamos a una base de datos
*/

const mongoose = require('mongoose');   //modulo para conectarnos a mongodb

const URI = process.env.MONGOOSE_URI  //?direccion de nuestra base datos
  ? process.env.MONGOOSE_URI  //Condicion si no encuantra la direccion
  : 'mongodb://localhost/notasenlinea';   //Caso contrario conectarse a esta base de datos 

mongoose.connect(URI, {//!Conectarnos a un sevidor de mongodb
  useNewUrlParser: true,    //
  useCreateIndex: true,     //     Modulo para conectar moongose
  useUnifiedTopology: true,
  useFindAndModify: false
});

const connection = mongoose.connection;

connection.once('open', () => {//?Cunado la conexion sea abierta ejecutar algo por consola
  console.log('Base de datos conectado!');
});
