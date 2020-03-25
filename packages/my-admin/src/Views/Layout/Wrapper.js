import React, { Component } from "react";
import { Route } from "react-router-dom";
import Main from "./Main";

class Wrapper extends Component {
  render() {
    const { component: Component, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props => {
          return (
            <Main>
              <Component {...props} />
            </Main>
          );
        }}
      />
    );
  }
}

export default Wrapper;
