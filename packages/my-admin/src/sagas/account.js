import { fork, takeLatest, put, call, select, all } from "redux-saga/effects";
import { app } from "common-ui";
import {
  loginAccountCompletion,
  logoutAccountCompletion,
  fetchError,
  launch
} from "actions";

export function* watchLoginAccount() {
  yield takeLatest("LOGIN_ACCOUNT", function*() {
    const { username, password } = yield select(
      state => state.account.login.input
    );

    let error;
    if (!username) {
      error = new Error("请输入手机号");
    }
    if (!password) {
      error = new Error("请输入密码");
    }

    if (error) {
      yield put(fetchError(error));
      yield put(loginAccountCompletion(error));
      return;
    }

    // const options = {
    //   url: "/api/login",
    //   method: "POST",
    //   data: { username, password }
    // };
    // const result = yield call(app.httpFetch, options);
    // yield put(loginAccountCompletion(result.error));
    let result = {};

    if (!result.error) {
      yield put(launch());
    }
  });
}

export function* watchLogoutAccount() {
  yield takeLatest("LOGOUT_ACCOUNT", function*() {
    const options = {
      url: "/api/logout",
      method: "POST"
    };
    const result = yield call(app.httpFetch, options);
    yield put(logoutAccountCompletion(result.error));

    if (!result.error) {
      yield put(launch());
    }
  });
}

export default function* accountSaga() {
  yield all([fork(watchLoginAccount), fork(watchLogoutAccount)]);
}
