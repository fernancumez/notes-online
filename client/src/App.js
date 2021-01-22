import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import CreateNote from "./components/CreateNote";
import CreateUser from "./components/CreateUser";
import NotesList from "./components/NotesList";
import NoteState from "./context/notes/noteState";
import About from "./components/About";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "./App.css";

const App = () => (
  <NoteState>
    <Router>
      <Navigation />
      <div className="container p-4">
        <Route path="/" exact component={NotesList} />
        <Route path="/edit/:id" component={CreateNote} />
        <Route path="/create" component={CreateNote} />
        <Route path="/user" component={CreateUser} />
        <Route path="/about" component={About} />
      </div>
    </Router>
  </NoteState>
);

export default App;
