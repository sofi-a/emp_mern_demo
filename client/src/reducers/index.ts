import { combineReducers } from 'redux';
import alerts from './alerts';
import employees from './employees';
import loading from './loading';

export default combineReducers({
    alerts,
    employees,
    loading
});
