import { GET_USERS, CREATE_USERS, DELETE_USERS } from "../../constants";

const userReducer = (state, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        getAllUsers: false,
      };

    case CREATE_USERS:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case DELETE_USERS:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };

    default:
      return state;
  }
};
export default userReducer;
