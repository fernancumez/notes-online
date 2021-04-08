import React, { Suspense } from "react";
import { BrowserRouter, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "./styles/App.css";

import NoteState from "./context/notes/noteState";
import UserState from "./context/users/userState";
import AlertState from "./context/alerts/alertState";

import { routes } from "./routes";
import { RoutesContainer } from "./components/RoutesContainer";
import Navigation from "./views/Navigation";
import Loading from "./components/Loading";

const App = () => (
  <NoteState>
    <UserState>
      <AlertState>
        <BrowserRouter>
          <Navigation />
          <div className="container p-4">
            <Switch>
              <Suspense fallback={<Loading />}>
                {routes.map((route, id) => (
                  <RoutesContainer key={id} {...route} />
                ))}
              </Suspense>
            </Switch>
          </div>
        </BrowserRouter>
      </AlertState>
    </UserState>
  </NoteState>
);

export default App;
