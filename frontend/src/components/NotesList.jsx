//TODO: Componente para crear nuevas notas

import React, { Component } from 'react';
import axios from 'axios';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';

class NotesList extends Component {

  state = {
    notes: []
  }

  async componentDidMount() {
    this.getNotes();
  }

  getNotes = async () => {
    const res = await axios.get('http://localhost:4000/api/notes'); //?Traer las notas almacenadas
    this.setState({
      notes: res.data
    });
  }

  //!Metodo para elimiar una nota
  deleteNote = async (noteId) => {
    const response = window.confirm('Quieres eliminar esta nota?');
    if (response) {
      await axios.delete('http://localhost:4000/api/notes/' + noteId);
      this.getNotes();
    }
  }

  render() {
    return (
      <div className="row">
        {
          this.state.notes.map(note => (
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
                  <p><b>Autor: </b>{note.author}</p>
                  <p>{format(note.createdAt)}</p>
                </div>
                <div className="card-footer">
                  <button className="btn btn-danger" onClick={() => this.deleteNote(note._id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}

export default NotesList;