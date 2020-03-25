import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { app, Layout, Input, Icon, Button } from "common-ui";
import { createSelector } from "reselect";
import styles from "./Login.module.css";

import { connect } from "react-redux";
import { loginAccount, clearAccountLogin, inputForAccountLogin } from "actions";

@connect(
  createSelector(
    state => state.account.login,
    state => state.app.own,
    (state, props) => app.parseLocation(props.location).searchData,
    (data, own, query) => {
      return {
        ...data,
        own,
        redirectURL: query.redirectURL || "/"
      };
    }
  ),
  {
    loginAccount,
    clearAccountLogin,
    inputForAccountLogin
  }
)
class Login extends Component {
  componentWillUnmount() {
    const { history, clearAccountLogin } = this.props;

    if (history.action !== "PUSH") {
      clearAccountLogin();
    }
  }

  handleInputChange = evt => {
    const node = evt.target;
    const { inputForAccountLogin } = this.props;

    inputForAccountLogin({ [node.name]: node.value });
  };

  handleSubmit = () => {
    app.navigateTo("/");
    // const { saveStatus, loginAccount } = this.props;

    // if (saveStatus !== 1) {
    //   loginAccount();
    // }
  };

  render() {
    const {
      input: { username, password },
      saveStatus,
      own,
      redirectURL
    } = this.props;

    if (own) {
      return <Redirect to={redirectURL} />;
    }

    return (
      <Layout className={styles.wrapper}>
        <div className={styles.box}>
          <div className={styles.sep16} />
          <h1 className={styles.title}>测试项目</h1>
          <label>
            <div className={styles.labelText}>输入电话号码</div>
            <Input
              className={styles.input1}
              size="large"
              prefix={<Icon type="mobile" />}
              name="username"
              value={username}
              onPressEnter={this.handleSubmit}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            <div className={styles.labelText}>输入密码</div>
            <Input
              className={styles.input1}
              size="large"
              prefix={<Icon type="key" />}
              type="password"
              name="password"
              value={password}
              onPressEnter={this.handleSubmit}
              onChange={this.handleInputChange}
            />
          </label>
          <div className={styles.sep40} />
          <Button
            type="primary"
            size="large"
            loading={saveStatus === 1}
            className={styles.button}
            onClick={this.handleSubmit}
          >
            登录
          </Button>
        </div>
      </Layout>
    );
  }
}

export default Login;
