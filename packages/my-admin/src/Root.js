import React, { useState, useEffect } from "react";
import { app, Loading, showTips, LocaleProvider, showConfirm } from "common-ui";
import { Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import initApp from "utils/initApp";
import Loadable from "react-loadable";

const App = Loadable({
  loader: () => import("./Views/Layout/App"),
  loading: Loading,
  delay: 300
});

export default function Root() {
  const [ready, setReady] = useState(false);
  const [errMsg, setErrMsg] = useState(null);

  useEffect(() => {
    initApp({ showTips, showConfirm })
      .then(() => setReady(true))
      .catch(error => setErrMsg(error.message || "未知错误"));
  }, []);

  if (errMsg) {
    console.log("errMsg", errMsg);
  }

  if (!ready) {
    return <Loading />;
  }
  return (
    <Provider store={app.store}>
      <Router history={app.history}>
        <LocaleProvider>
          <Route component={App} />
        </LocaleProvider>
      </Router>
    </Provider>
  );
}
