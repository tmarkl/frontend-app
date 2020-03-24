import { fork, all } from "redux-saga/effects";
import appSaga from "./app";
export default function* root() {
  yield all([fork(appSaga)]);
}
