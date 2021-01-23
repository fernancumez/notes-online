import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import CreateNote from "./components/CreateNote";
import CreateUser from "./components/CreateUser";
import NotesList from "./components/NotesList";
import About from "./components/About";
import NotFound from "./views/404";

import NoteState from "./context/notes/noteState";
import UserState from "./context/users/userState";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "./styles/App.css";

const App = () => (
  <NoteState>
    <UserState>
      <BrowserRouter>
        <Navigation />
        <div className="container p-4">
          <Switch>
            <Route path="/" exact component={NotesList} />
            <Route path="/edit/:id" exact component={CreateNote} />
            <Route path="/create" exact component={CreateNote} />
            <Route path="/user" exact component={CreateUser} />
            <Route path="/about" exact component={About} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    </UserState>
  </NoteState>
);

export default App;
