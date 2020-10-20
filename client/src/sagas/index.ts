import { fork } from 'redux-saga/effects';
import { getEmployeesWatcher } from './employees/getEmployeesSaga';
import { removeEmployeeWatcher } from './employees/removeEmployeeSaga';
import { saveEmployeeWatcher } from './employees/saveEmployeeSaga';
import { updateEmployeeWatcher } from './employees/updateEmployeeSaga';

export default function* rootSaga() {
  yield fork(getEmployeesWatcher);
  yield fork(removeEmployeeWatcher);
  yield fork(saveEmployeeWatcher);
  yield fork(updateEmployeeWatcher);
};
