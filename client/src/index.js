//TODO: Archivo principal que arranca toda nuestra aplicación

import React, { StrictMode } from "react"; //?importamos react
import ReactDOM from "react-dom"; //?importamos react-dom
import App from "./App"; //?importamos la funcion app del componente App

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("root")
); //!Despliega la aplicacion
