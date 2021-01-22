import React, { useReducer } from "react";
import noteContext from "./noteContext";
import noteReducer from "./noteReducer";
import axios from "axios";

import {
  URI,
  GET_NOTES,
  DELETE_NOTES,
  UPDATE_NOTES,
  CREATE_NOTES,
} from "../../constants";

const NoteState = (props) => {
  const initialState = {
    notes: [],
    getAllNotes: true,
  };

  // Dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(noteReducer, initialState);

  // Obtener las notas
  const getNotes = async () => {
    try {
      const { data } = await axios.get(`${URI}/notes`);
      console.log(data);

      dispatch({
        type: GET_NOTES,
        payload: data.notes,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const createNotes = async (noteData, history) => {
    try {
      const res = await axios.post(`${URI}/notes`, noteData);
      console.log(res.data);

      dispatch({
        type: CREATE_NOTES,
        payload: res.data.note,
      });

      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const updatedNotes = async (note, history) => {
    try {
      const res = await axios.put(`${URI}/notes/${note._id}`, note);
      console.log(res.data);

      dispatch({
        type: UPDATE_NOTES,
        payload: res.data.note,
      });

      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNotes = async (noteId) => {
    try {
      const response = window.confirm("Quieres eliminar esta nota?");
      if (!response) return;

      await axios.delete(`${URI}/notes/${noteId}`);

      dispatch({
        type: DELETE_NOTES,
        payload: noteId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <noteContext.Provider
      value={{
        notes: state.notes,
        getAllNotes: state.getAllNotes,
        getNotes,
        createNotes,
        updatedNotes,
        deleteNotes,
      }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
