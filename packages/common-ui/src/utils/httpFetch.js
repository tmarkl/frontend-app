import { put, call } from 'redux-saga/effects';
import app from '../app';

export default function*({
  error_silent,
  sync_server_time,
  ...fetchOptions
} = {}) {
  const { fetchAPI } = app;

  try {
    const result = yield call(fetchAPI, fetchOptions);

    if (result.now && sync_server_time) {
      yield put({
        type: 'SYNC_SERVER_TIME',
        time: result.now * 1000 - new Date().getTime(),
      });
    }

    return result;
  } catch (error) {
    if (error && !error_silent) {
      app.showTips('error', error.message);
    }

    return { error };
  }
}
