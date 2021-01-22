//TODO: Componente para crear usuarios

import React, { useState, useEffect } from "react"; //?importando react
import { URI } from "../constants";
import axios from "axios"; //?Importando axios que nos permite hacer peticiones http(put, delete, post, get)

const CreateUser = () => {
  //Estados iniciales
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const { data } = await axios.get(`${URI}/users`);
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeUserName = (evt) => {
    const { value } = evt.target;
    setUserName(value);
  };

  const handleSubmit = async (evt) => {
    try {
      evt.preventDefault();
      await axios.post(`${URI}/users`, {
        username: userName,
      });
      setUserName("");
      getUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (userID) => {
    try {
      const response = window.confirm("Quieres eliminar este usuario?");
      if (!response) return;

      await axios.delete(`${URI}/users/${userID}`);
      getUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card">
          <div className="card-header text-center">
            <h3>Crear un usuario</h3>
          </div>
          <form onSubmit={handleSubmit} className="card-body">
            {" "}
            {/*Crear usuarios */}
            <div className="form-group">
              <input
                className="form-control"
                value={userName}
                type="text"
                onChange={handleChangeUserName}
              />
            </div>
            <button type="submit" className="btn btn-secondary">
              {" "}
              {/*Guardar usuarios */}
              <i>Guardar</i>
            </button>
          </form>
        </div>
      </div>
      <div className="col-md-8">
        <ul className="list-group">
          {" "}
          {/*Mostrar usuarios guardados*/}
          {users.map((user) => (
            <li
              className="list-group-item list-group-item-action"
              key={user._id}
            >
              <b>Usuario:</b> {user.username}
              <span>
                <button
                  className="btn btn-danger float-right text-light cursor-pointer rounded-pill"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Eliminar
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateUser;
