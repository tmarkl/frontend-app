import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

export default function(options = {}) {
  const { preloadedState, rootReducer, rootSaga, debug } = options;
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  if (debug) {
    middlewares.push(logger);
  }

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middlewares)
  );

  store.runSaga = () => {
    sagaMiddleware.run(rootSaga);
  };

  return store;
}
