import initCore from "@frontend/core";
import initReact from "@frontend/react";
import rootReducer from "../reducers";
import rootSaga from "../sagas";
import app from "./app";

const env = {
  debug: process.env.REACT_APP_DEBUG === "1",
  origin: process.env.REACT_APP_ORIGIN
};

const coreOptions = {
  store: { rootReducer, rootSaga, debug: env.debug },
  fetchAPI: {
    origin: env.origin,
    parseData: json => {
      const { code, message, now, obj } = json;

      if (code < 0) {
        const error = new Error(message);
        error.code = code;

        throw error;
      }

      return { data: obj, now };
    }
  }
};

export default function initApp(options) {
  Object.assign(app, initCore(coreOptions));
  Object.assign(app, initReact(app));

  return Promise.resolve()
    .then(() => Object.assign(app, options, { env }))
    .then(() => app.store.runSaga);
}
