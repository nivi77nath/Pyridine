import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import * as views from "./views";
import React from "react";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/demo/:compoundName" component={views.AipDemo} />
        <Route exact path="/" component={views.Home} />
        <Redirect from="/demo" to="/demo/glucose" />
      </Switch>
    </BrowserRouter>
  );
}
