
//TODO: Funciones por aparte para tener mas orden

const Note = require('../models/Note');  //?Gracias a este modelo podemos consultar, actualizar datos
const notesCtrl = {};

//*Funcion que nos permite obtener datos
notesCtrl.getNotes = async (req, res) => {
  const notes = await Note.find(); //Consulta todos los datos en la coleccion notes  
  res.json(notes);
};

//*Funcion cuando queremos guardar un dato
notesCtrl.createNote = async (req, res) => {
  const { title, content, date, author } = req.body;
  const newNote = new Note({//Una nueva nota
    title,
    content,
    date,
    author
  });
  await newNote.save();//?Representa los datos que me envia el cliente
  res.json('New Note added');
};

notesCtrl.getNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.json(note);
}

//*Funcion para eliminar un dato
notesCtrl.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id)
  res.json('Note Deleted');
}

//*Funcion para actualizar un dato
notesCtrl.updateNote = async (req, res) => {
  const { title, content, duration, author } = req.body;
  await Note.findByIdAndUpdate(req.params.id, {
    title,
    content,
    duration,
    author
  });
  res.json('Note Updated');
}

module.exports = notesCtrl;