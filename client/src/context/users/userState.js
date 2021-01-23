import React, { useReducer } from "react";
import userContext from "./userContext";
import userReducer from "./userReducer";
import axios from "axios";

import { URI, GET_USERS, CREATE_USERS, DELETE_USERS } from "../../constants";

const UserState = (props) => {
  const initialState = {
    users: [],
    getAllUsers: true,
  };

  // Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Obtener todos los usuarios
  const getUsers = async () => {
    try {
      const { data } = await axios.get(`${URI}/users`);
      console.log(data);

      dispatch({
        type: GET_USERS,
        payload: data.users,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const createUsers = async (userData) => {
    try {
      const { data } = await axios.post(`${URI}/users`, userData);
      console.log(data);

      dispatch({
        type: CREATE_USERS,
        payload: data.user,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUsers = async (userId) => {
    try {
      const response = window.confirm("Quieres eliminar esta nota?");
      if (!response) return;

      await axios.delete(`${URI}/users/${userId}`);

      dispatch({
        type: DELETE_USERS,
        payload: userId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <userContext.Provider
      value={{
        users: state.users,
        getAllUsers: state.getAllUsers,
        getUsers,
        createUsers,
        deleteUsers,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default UserState;
