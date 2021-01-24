import React, { useReducer } from "react";
import alertReducer from "./alertReducer";
import alertContext from "./alertContext";
import { SHOW_ALERT, HIDE_ALERT } from "../../constants";

const AlertState = (props) => {
  const initialState = {
    showAlert: null,
  };

  const [state, dispatch] = useReducer(alertReducer, initialState);

  const showAlerts = (message, cssClass) => {
    try {
      dispatch({
        type: SHOW_ALERT,
        payload: {
          message,
          cssClass,
        },
      });

      setTimeout(() => {
        dispatch({
          type: HIDE_ALERT,
        });
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <alertContext.Provider
      value={{
        showAlert: state.showAlert,
        showAlerts,
      }}
    >
      {props.children}
    </alertContext.Provider>
  );
};

export default AlertState;
