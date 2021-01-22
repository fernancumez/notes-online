import {
  GET_NOTES,
  CREATE_NOTES,
  UPDATE_NOTES,
  DELETE_NOTES,
} from "../../constants";

const noteReducer = (state, action) => {
  switch (action.type) {
    case GET_NOTES:
      return {
        ...state,
        notes: action.payload,
        getAllNotes: false,
      };

    case CREATE_NOTES:
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };

    case UPDATE_NOTES:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note._id === action.payload._id ? action.payload : note
        ),
      };

    case DELETE_NOTES:
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== action.payload),
        note: null,
      };
    default:
      return state;
  }
};
export default noteReducer;
