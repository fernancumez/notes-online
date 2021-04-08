/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../libs/axios";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

import noteContext from "../context/notes/noteContext";
import userContext from "../context/users/userContext";
import alertContext from "../context/alerts/alertContext";

import Loading from "../components/Loading";

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
  const [getNote, setGetNote] = useState(false);
  const [actualUserId, setActualUserId] = useState("");

  const notesContext = useContext(noteContext);
  const usersContext = useContext(userContext);
  const alertsContext = useContext(alertContext);

  const { createNotes, updatedNotes } = notesContext;
  const { users, getUsers, getAllUsers } = usersContext;
  const { showAlerts } = alertsContext;

  useEffect(() => {
    if (match.params.id) editingMode();
    if (getAllUsers) getUsers();
  }, []);

  const editingMode = async () => {
    setGetNote(true);
    try {
      const { data } = await axios.get(`/notes/${match.params.id}`);
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
      setActualUserId(data.author);
      setGetNote(false);
    } catch (error) {
      console.error(error);
      setGetNote(false);
    }
  };

  const handleSubmit = (evt) => {
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

        updatedNotes(actualUserId, noteUpdated, history).then(() => {
          showAlerts("Note updated successfully", "info");
        });
      } else {
        const newNote = {
          title: form.title,
          content: form.content,
          author: form.userSelected,
          date: form.date,
        };
        createNotes(newNote, history).then(() => {
          showAlerts("Note added successfully", "success ");
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value });
  };

  const onChangeDate = (date) => {
    setForm({ ...form, date });
  };

  if (getNote) return <Loading />;
  if (getAllUsers) return <Loading />;

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
              <option value="" />
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.username}
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
