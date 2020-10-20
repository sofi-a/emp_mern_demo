import { call, put, takeLatest } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';
import { setAlert } from '../../actions/alerts';
import { setEmployees } from '../../actions/employees';
import { setLoading } from '../../actions/loading';
import { GET_EMPLOYEES, GetEmployeesAction } from '../../actions/types';
import { getEmployees } from '../../utils/api';

export function* getEmployeesWorker(action: GetEmployeesAction) {
    try {
        yield put(setLoading(true));
        const employees = yield call(getEmployees, action.payload);
        yield put(setLoading(false));
        yield put(setEmployees(employees.data));
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

export function* getEmployeesWatcher() {
    yield takeLatest(GET_EMPLOYEES, getEmployeesWorker);
}
