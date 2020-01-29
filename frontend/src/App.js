//TODO: Componente inicializa toods los componentes

import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; //?importamos componentes de react-router
import Navigation from './components/Navigation'; //
import NotesList from './components/NotesList';   //
import CreateNote from './components/CreateNote'; //   ?IMPORTACION DE COMPONENTES
import CreateUser from './components/CreateUser'; //
import About from './components/About';           //
import 'bootstrap/dist/css/bootstrap.min.css';  //importamos bootstrap css
import 'bootstrap/dist/js/bootstrap';   //importamos bootstrap js
import './App.css';

function App() {  //!funcion principal
  return (
    <Router>  {/*Configuracion de las rutas de navegacion*/}
      <Navigation />
      <div className="container p-4">
        <Route path="/" exact component={NotesList} />
        <Route path="/edit/:id" component={CreateNote} />
        <Route path="/create" component={CreateNote} />
        <Route path="/user" component={CreateUser} />
        <Route path="/about" component={About}></Route>
      </div>
    </Router>
  );
}

export default App;  //*Exportamos nuestra funcion
