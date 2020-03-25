import { fork, all } from "redux-saga/effects";
import appSaga from "./app";
import accountSaga from "./account";
export default function* root() {
  yield all([fork(appSaga), fork(accountSaga)]);
}
