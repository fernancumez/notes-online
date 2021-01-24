import { SHOW_ALERT, HIDE_ALERT } from "../../constants";

const alertReducer = (state, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        showAlert: action.payload,
      };

    case HIDE_ALERT:
      return {
        showAlert: null,
      };

    default:
      return state;
  }
};

export default alertReducer;
