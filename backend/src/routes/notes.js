
/*
  En este archivo se crean los enrutadores de las notas

  Conceptoos relacionados con las RestAPI en node
  Tipos de peticiones http
  .get()  => Nos permite obtener datos
  .post() => Nos permite guardar un nuevo dato
  .put() => Cuando se actualizar un dato
  .delete() => Cuando queremos eliminar un dato
  .patch() => Para actualizar una sola propiedad de un dato
*/

const { Router } = require('express');  //Importar la funcion Router 
const router = Router();

const { getNotes, createNote, getNote, deleteNote, updateNote } = require('../controllers/notes.controller');

router.route('/')   //Ruta y sus metodos
  .get(getNotes)    //El metodo get nos permite obtener datos
  .post(createNote); //Nos permite guardar un nuevo dato 

router.route('/:id')
  .get(getNote)
  .delete(deleteNote)
  .put(updateNote);

module.exports = router;
