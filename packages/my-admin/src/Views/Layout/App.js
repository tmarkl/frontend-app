import React, { Component } from "react";
import Login from "../Account/Login";
import Home from "./Home";
import Test from "./Test";
import styles from "./App.module.css";
import { Route, Switch } from "react-router-dom";
import { Error404 } from "common-ui";
import Wrapper from "./Wrapper";

class App extends Component {
  renderRoute(location) {
    return (
      <Switch location={location}>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Wrapper path="/home/test" component={Test} />
        <Route component={Error404} />
      </Switch>
    );
  }

  render() {
    const { location } = this.props;
    return <div className={styles.wrapper}>{this.renderRoute(location)}</div>;
  }
}
export default App;
