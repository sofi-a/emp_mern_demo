import { call, put, takeEvery } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';
import { EmployeeFormValue } from '../../models';
import { ADD_EMPLOYEE, EmployeeActionTypes } from '../../actions/types';
import { setAlert } from '../../actions/alerts';
import { setLoading } from '../../actions/loading';
import { setEmployee } from '../../actions/employees';
import { postEmployee } from '../../utils/api';

export function* saveEmployeeWorker(action: EmployeeActionTypes) {
    let employee;
    try {
        yield put(setLoading(true));
        employee = yield call(postEmployee, action.payload as EmployeeFormValue);
        yield put(setLoading(false));
        yield put(setEmployee(employee.data.data));
        yield put(setAlert({
            id: uuidv4(),
            message: `Successfuly added ${employee.data.data.name}`,
            type: 'success',
            open: true,
            timeout: 5000
        }));
    } catch(error) {
        console.error(error);
        yield put(setLoading(false));
        yield put(setAlert({
            id: uuidv4(),
            message: 'Failed to connect to server',
            type: 'error',
            open: true,
            timeout: 5000
        }));
    }
}

export function* saveEmployeeWatcher() {
    yield takeEvery(ADD_EMPLOYEE, saveEmployeeWorker);
}
