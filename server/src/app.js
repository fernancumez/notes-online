
//TODO: Configuramos el puerto, los middelwares y las rutas

const express = require('express');
const cors = require('cors');
const app = express();

//?Configurar el servidor
app.set('port', process.env.PORT || 4000);

//*Definir funciones que  que ejecutan antes de llegar  las rutas(middlewares)
app.use(cors());//Permite enviar y recibir datos
app.use(express.json()); //Especifiaca que se enviaran arhivos json y formatos string

// routes
app.use('/api/notes', require('./routes/notes'));   //?    Creamos rutas en nuestro servidor
app.use('/api/users', require('./routes/users'));   //?    Creamos rutas en nuestro servidor

module.exports = app;
