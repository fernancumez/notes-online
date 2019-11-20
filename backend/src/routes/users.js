
/*
  En este archivo se crean los enrutadores de los usuarios

  Conceptoos relacionados con las RestAPI en node
  Tipos de peticiones http
  .get()  => Nos permite obtener datos
  .post() => No permite guardar un nuevo dato
  .put() => Cuando se actualizar un dato
  .delete() => Cuando queremos eliminar un dato
*/

const { Router } = require('express');  //Importar la funcion Router 
const router = Router();

const { getUsers, createUser, deleteUser } = require('../controllers/users.controller');

router.route('/') //Ruta y sus metodos
  .get(getUsers)
  .post(createUser);

router.route('/:id')
  .delete(deleteUser);

module.exports = router;
