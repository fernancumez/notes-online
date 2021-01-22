/* eslint-disable react-hooks/exhaustive-deps */
//TODO: Componente para crear nuevas notas

import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

const NotesList = () => {
  const notesContext = useContext(noteContext);
  const { notes, getAllNotes, getNotes, deleteNotes } = notesContext;

  useEffect(() => {
    if (!getAllNotes) return;
    getNotes();
  }, []);

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
            <div className="card-footer text-center">
              <button
                className="btn btn-danger"
                onClick={() => deleteNotes(note._id)}
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
