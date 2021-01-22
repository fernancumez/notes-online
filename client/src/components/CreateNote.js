/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

import { Link } from "react-router-dom";
import { URI } from "../constants";
import axios from "axios";

const CreateNote = ({ match, history }) => {
  const initialState = {
    _id: "",
    title: "",
    content: "",
    editing: false,
    date: new Date(),
    userSelected: "",
  };

  const [form, setForm] = useState(initialState);
  const [users, setUsers] = useState([]);

  const notesContext = useContext(noteContext);
  const { createNotes, updatedNotes } = notesContext;

  useEffect(() => {
    if (match.params.id) editingMode();
    getUsers();
  }, []);

  // Get all users
  const getUsers = async () => {
    try {
      const { data } = await axios.get(`${URI}/users`);
      console.log(data);
      if (data.length > 0) {
        let users = data.map((user) => user.username);
        console.log(users);
        setForm({ ...form, userSelected: data[0].username });
        setUsers(users);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editingMode = async () => {
    try {
      const { data } = await axios.get(`${URI}/notes/${match.params.id}`);
      console.log(data);

      let newFormState = {
        _id: data._id,
        title: data.title,
        content: data.content,
        date: new Date(data.date),
        userSelected: data.author,
        editing: true,
      };

      setForm(newFormState);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (evt) => {
    try {
      evt.preventDefault();

      if (form.editing) {
        let noteUpdated = {
          _id: form._id,
          title: form.title,
          content: form.content,
          author: form.userSelected,
          date: form.date,
        };

        updatedNotes(noteUpdated, history);
      } else {
        const newNote = {
          title: form.title,
          content: form.content,
          author: form.userSelected,
          date: form.date,
        };
        createNotes(newNote, history);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (evt) => {
    //*Metodo para capturar los tados que se ingresen en el titulo y el contenido

    const { name, value } = evt.target;
    setForm({ ...form, [name]: value });
  };

  const onChangeDate = (date) => {
    //*Metodo para manipular el cambio de fecha
    setForm({ ...form, date });
  };

  return (
    <div className="col-md-6 offset-md-3">
      <div className="card">
        <div className="card-header text-center">
          <h4>Crear una nota</h4>
        </div>
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-group">
            <select
              className="form-control"
              value={form.userSelected}
              onChange={handleChange}
              name="userSelected"
              required
            >
              {users.map((user, id) => (
                <option key={id} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Título"
              onChange={handleChange}
              name="title"
              value={form.title}
              required
            />
          </div>

          <div className="form-group">
            <textarea
              type="text"
              className="form-control"
              placeholder="Contenido"
              name="content"
              onChange={handleChange}
              value={form.content}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <DatePicker
              className="form-control"
              selected={form.date}
              onChange={onChangeDate}
            />
          </div>
          <div className="text-center">
            <button className="btn btn-primary" type="submit">
              Guardar
            </button>
            <Link to="/">
              <button className="btn btn-danger ml-3">Cancelar</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
