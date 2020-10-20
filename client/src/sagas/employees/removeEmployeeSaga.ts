import { put, call, takeEvery } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';
import { REMOVE_EMPLOYEE, EmployeeActionTypes } from '../../actions/types';
import { deleteEmployee } from '../../utils/api';
import { setAlert } from '../../actions/alerts';
import { setLoading } from '../../actions/loading';
import { filterRemovedEmployee } from '../../actions/employees';

function* removeEmployeeWorker(action: EmployeeActionTypes) {
    let employee;
    try {
        yield put(setLoading(true));
        employee = yield call(deleteEmployee, action.payload as string);
        yield put(setLoading(false));
        yield put(filterRemovedEmployee(employee.data.data._id));
        yield put(setAlert({
            id: uuidv4(),
            message: `Successfuly removed ${employee.data.data.name}`,
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

export function* removeEmployeeWatcher() {
    yield takeEvery(REMOVE_EMPLOYEE, removeEmployeeWorker);
}
