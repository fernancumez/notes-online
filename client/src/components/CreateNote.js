/* eslint-disable react-hooks/exhaustive-deps */
//TODO: Componente para crear nuevas notas

import React, { useState, useEffect } from "react"; //?importando react
import "react-datepicker/dist/react-datepicker.css"; //?Importar js del calendario
import DatePicker from "react-datepicker"; //?Importar calendario
import { URI } from "../constants";
import axios from "axios"; //?importando el mandejar de peticiones http

const CreateNote = ({ match }) => {
  const initialState = {
    _id: "",
    title: "",
    content: "",
    editing: false,
    date: new Date(),
    userSelected: "",
    users: [],
  };

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    getUsers();
    if (match.params.id) {
      editingMode();
    }
  }, []);

  // Get all users
  const getUsers = async () => {
    try {
      const { data } = await axios.get(`${URI}/users`);
      console.log(data);
      if (data.length > 0) {
        let users = data.map((user) => user.username);
        setForm({ ...form, userSelected: data[0].username, users });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editingMode = async () => {
    try {
      const { data } = await axios.get(`${URI}/notes/${match.params.id}`);

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
        let updatedNote = {
          title: form.title,
          content: form.content,
          author: form.userSelected,
          date: form.date,
        };

        await axios.put(`${URI}/notes/${form._id}`, updatedNote);
      } else {
        const newNote = {
          title: form.title,
          content: form.content,
          author: form.userSelected,
          date: form.date,
        };
        await axios.post(`${URI}/notes`, newNote);
      }
      window.location.href = "/";
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
          {/*Seleccionar usuario */}
          <div className="form-group">
            <select
              className="form-control"
              value={form.userSelected}
              onChange={handleChange}
              name="userSelected"
              required
            >
              {form.users.map((user, id) => (
                <option key={id} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
          {/*Ingreso del titulo*/}
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
          {/*Ingreso de contenido variado*/}
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
          {/*Componenete de calendario de react*/}
          <div className="form-group">
            <DatePicker
              className="form-control"
              selected={form.date}
              onChange={onChangeDate}
            />
          </div>
          <button className="btn btn-primary">
            <i className="material-icons">Guardar</i>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
