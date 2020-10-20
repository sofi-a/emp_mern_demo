import { Employee, ResponsePage } from '../models'
import {
    SET_EMPLOYEE,
    SET_EMPLOYEES,
    FILTER_REMOVED_EMPLOYEE,
    SET_UPDATED_EMPLOYEE,
    EmployeeActionTypes
} from '../actions/types';

const initialState: ResponsePage = {
    meta: {
        page: {
            current_page: 0,
            per_page: 10,
            from: 0,
            to: 0,
            total: 0,
            last_page: 0,
        },
        links: {
            first: '',
            last: '',
            next: '',
            prev: ''
        }
    },
    data: []
}

export default (state: ResponsePage = initialState, action: EmployeeActionTypes) => {
    const { type, payload } = action;

    switch(type) {
        case SET_EMPLOYEE:
            return {
                ...state,
                page: {...state.meta.page, total: (state!.meta!.page!.total + 1)},
                data: [payload, ...state.data]
            };
        case SET_EMPLOYEES:
            return payload;
        case FILTER_REMOVED_EMPLOYEE:
            return {
                ...state,
                page: {...state.meta.page, total: (state!.meta!.page!.total - 1)},
                data: state.data.filter(employee => employee._id !== payload)
            };
        case SET_UPDATED_EMPLOYEE:
            let updatedEmployee = payload as Employee;
            return {
                ...state,
                data: state.data.map(employee =>
                    employee._id === updatedEmployee._id ? updatedEmployee : employee)
            };
        default:
            return state;
    }
}
