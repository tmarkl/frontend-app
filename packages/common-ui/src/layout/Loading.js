import React, { Component } from "react";
import styles from "./Loading.module.css";

class Loading extends Component {
  render() {
    return <div className={styles.wrapper}>加载中...</div>;
  }
}

export default Loading;
