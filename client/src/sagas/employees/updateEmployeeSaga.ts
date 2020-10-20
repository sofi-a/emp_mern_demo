import { put, call, takeEvery } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';
import { Employee } from '../../models';
import { UPDATE_EMPLOYEE, EmployeeActionTypes } from '../../actions/types';
import { setAlert } from '../../actions/alerts';
import { setUpdatedEmployee } from '../../actions/employees'
import { setLoading } from '../../actions/loading';
import { putEmployee } from '../../utils/api';

function* updateEmployeeWorker(action: EmployeeActionTypes) {
    let employee;
    try {
        yield put(setLoading(true));
        employee = yield call(putEmployee, action.payload as Employee);
        yield put(setLoading(false));
        yield put(setUpdatedEmployee(employee.data.data));
        yield put(setAlert({
            id: uuidv4(),
            message: `Successfuly updated ${employee.data.data.name}`,
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

export function* updateEmployeeWatcher() {
    yield takeEvery(UPDATE_EMPLOYEE, updateEmployeeWorker); 
}
