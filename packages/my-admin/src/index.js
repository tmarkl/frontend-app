import React from "react";
import { render } from "react-dom";
import Root from "./Root";
import { Router, Route } from "react-router-dom";
import { createHashHistory } from "history";

const history = createHashHistory();

render(
  <Router history={history}>
    <Route component={Root}></Route>
  </Router>,
  document.getElementById("root")
);
