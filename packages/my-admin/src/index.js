import React from "react";
import { render } from "react-dom";
import App from "./App";
import { Router, Route } from "react-router-dom";
import { createHashHistory } from "history";

const history = createHashHistory();

render(
  <Router history={history}>
    <Route component={App}></Route>
  </Router>,
  document.getElementById("root")
);
