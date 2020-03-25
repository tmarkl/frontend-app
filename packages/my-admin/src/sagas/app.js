import { fork, put, call, all, select, takeLatest } from "redux-saga/effects";
import { app } from "common-ui";
import { launch, loginAccount, launchCompletion } from "actions";

export function* watchLaunch() {
  yield takeLatest("LAUNCH", function*() {
    const result = yield call(app.httpFetch, {
      url: `/api/getLoginVo`,
      error_silent: true
    });
    yield put(launchCompletion(undefined, result.data));
  });
}

export function* watchFetchError() {
  yield takeLatest("FETCH_ERROR", function*({ error }) {
    const own = yield select(state => state.app.own);

    if (error.code === -203) {
      if (own) {
        yield put(launch());
      } else {
        yield put(loginAccount(true));
      }
    } else {
      app.showTips("error", error.message);
    }
  });
}

export default function* appSaga() {
  yield all([fork(watchLaunch), fork(watchFetchError)]);
}
