import { fork, put, call, all, takeLatest } from "redux-saga/effects";
import { launchCompletion } from "actions";

export function* watchLaunch() {
  yield takeLatest("LAUNCH", function*() {
    // const result = yield call(app.httpFetch, {
    //   url: `/api/getLoginVo`,
    //   error_silent: true
    // });
    // yield put(launchCompletion(undefined, result.data));
  });
}

export default function* appSaga() {
  yield all([fork(watchLaunch)]);
}
