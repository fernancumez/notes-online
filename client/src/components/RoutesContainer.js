import React from "react";
import { Route } from "react-router-dom";

export const RoutesContainer = (route) => (
  <Route
    path={route.path}
    exact={route.exact}
    component={(props) => <route.component {...props} routes={route.routes} />}
  />
);
