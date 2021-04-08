/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import userContext from "../context/users/userContext";
import alertContext from "../context/alerts/alertContext";
import Loading from "../components/Loading";

const CreateUser = () => {
  //Estados iniciales
  const [userName, setUserName] = useState("");

  const usersContext = useContext(userContext);
  const alertsContext = useContext(alertContext);

  const {
    users,
    getUsers,
    createUsers,
    deleteUsers,
    getAllUsers,
  } = usersContext;
  const { showAlerts } = alertsContext;

  useEffect(() => {
    if (getAllUsers) getUsers();
  }, []);

  const handleChangeUserName = ({ target }) => {
    setUserName(target.value);
  };

  const handleSubmit = (evt) => {
    try {
      evt.preventDefault();
      const newUser = {
        username: userName,
      };

      createUsers(newUser).then(() => {
        showAlerts("User added successfully", "success");
        setUserName("");
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = (user) => {
    if (!user.notes.length > 0) return deleteUsers(user._id);
    showAlerts(
      "You cannot delete this user, until you delete the related notes",
      "danger"
    );
  };

  if (getAllUsers) return <Loading />;

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="card">
          <div className="card-header text-center">
            <h3>Crear un usuario</h3>
          </div>
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-group">
              <input
                className="form-control"
                value={userName}
                type="text"
                onChange={handleChangeUserName}
              />
            </div>
            <button type="submit" className="btn btn-secondary">
              <i>Guardar</i>
            </button>
          </form>
        </div>
      </div>
      <div className="col-md-8">
        <ul className="list-group">
          {users.map((user) => (
            <li
              className="list-group-item list-group-item-action"
              key={user._id}
            >
              <b>Usuario:</b> {user.username}
              <span>
                <button
                  className="btn btn-danger float-right text-light cursor-pointer rounded-pill"
                  onClick={() => handleDeleteUser(user)}
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
