import React, { useReducer } from "react";
import noteContext from "./noteContext";
import noteReducer from "./noteReducer";
import axios from "../../libs/axios";

import {
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
      const { data } = await axios.get("/notes");

      dispatch({
        type: GET_NOTES,
        payload: data.docs,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const createNotes = async (noteData, history) => {
    try {
      const { data } = await axios.post("/notes", noteData);

      dispatch({
        type: CREATE_NOTES,
        payload: data.note,
      });

      history.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const updatedNotes = async (actualUserId, note, history) => {
    try {
      const { data } = await axios.put(
        `/notes/${actualUserId}/${note._id}`,
        note
      );

      dispatch({
        type: UPDATE_NOTES,
        payload: data.note,
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

      await axios.delete(`/notes/${noteId}`);

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
