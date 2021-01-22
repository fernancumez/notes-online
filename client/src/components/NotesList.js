//TODO: Componente para crear nuevas notas

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { URI } from "../constants";
import axios from "axios";

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      //?Traer las notas almacenadas
      const { data } = await axios.get(`${URI}/notes`);
      setNotes(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      const response = window.confirm("Quieres eliminar esta nota?");
      if (!response) return;

      await axios.delete(`${URI}/notes/${noteId}`);
      getNotes();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="row">
      {notes.map((note) => (
        <div className="col-md-4 p-2" key={note._id}>
          <div className="card">
            <div className="card-header d-flex justify-content-between">
              <h5>{note.title}</h5>
              <Link to={"/edit/" + note._id} className="btn btn-secondary">
                <i className="material-icons">Editar</i>
              </Link>
            </div>
            <div className="card-body">
              <p>{note.content}</p>
              <p>
                <b>Autor: </b>
                {note.author}
              </p>
              <p>{format(note.createdAt)}</p>
            </div>
            <div className="card-footer">
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteNote(note._id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotesList;
