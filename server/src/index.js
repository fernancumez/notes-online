
//TODO: Arrancamos nuestra aplicacion

require('dotenv').config(); //!Variable de entorno 

const app = require('./app');
require('./database');

async function main() {   //!Funcion principal
  await app.listen(app.get('port'));
  console.log('Server on port', app.get('port'));
}

main();