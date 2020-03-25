import { Component } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { app } from "common-ui";
import { menuList } from "../../utils/paths";

@connect(
  createSelector(
    state => state.app,
    app => app
  )
)
class Home extends Component {
  componentDidMount() {
    // const { own } = this.props;
    // if (own) {
    this.openLink();
    // } else {
    //   app.redirectTo("/login");
    // }
  }

  openLink(list) {
    console.log("menuList", menuList);

    if (!list) {
      return this.openLink(menuList);
    }

    if (list.length === 0) {
      return false;
    }

    return list.some(item => {
      if (typeof item === "string") {
        if (/^https?:/.test(item)) {
          window.location.replace(item);
        } else {
          app.redirectTo(item);
        }

        return true;
      }

      const [, sub] = item;
      return this.openLink(sub);
    });
  }

  render() {
    return null;
  }
}

export default Home;
