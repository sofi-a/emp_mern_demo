import { all, call, select, takeEvery } from 'redux-saga/effects';
import { SET_NAME } from './types';

export function* getName() {
  const name = yield select(state => state.name);
  console.log(`Hello ${name}!`);
}

export function* getNameWatcher() {
  yield takeEvery(SET_NAME, getName);
}

export default function* rootSaga() {
  yield all([
    call(getNameWatcher)
  ]);
};
