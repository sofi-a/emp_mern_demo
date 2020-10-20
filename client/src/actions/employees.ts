import { Employee, EmployeeFormValue, ResponsePage } from '../models';
import {
    ADD_EMPLOYEE,
    GET_EMPLOYEES,
    REMOVE_EMPLOYEE,
    FILTER_REMOVED_EMPLOYEE,
    SET_EMPLOYEE,
    SET_EMPLOYEES,
    UPDATE_EMPLOYEE,
    SET_UPDATED_EMPLOYEE,
    EmployeeActionTypes,
    GetEmployeesAction,
    PageQuery,
} from '../actions/types';

export const addEmployee = (employee: EmployeeFormValue): EmployeeActionTypes => ({
    type: ADD_EMPLOYEE,
    payload: employee
});

export const setEmployee = (employee: Employee): EmployeeActionTypes => ({
    type: SET_EMPLOYEE,
    payload: employee
});

export const loadEmployees = (query: PageQuery): GetEmployeesAction => ({
    type: GET_EMPLOYEES,
    payload: query
});

export const setEmployees = (page: ResponsePage): EmployeeActionTypes => ({
    type: SET_EMPLOYEES,
    payload: page
});

export const removeEmployee = (id: string): EmployeeActionTypes => ({
    type: REMOVE_EMPLOYEE,
    payload: id
});

export const filterRemovedEmployee = (id: string): EmployeeActionTypes => ({
    type: FILTER_REMOVED_EMPLOYEE,
    payload: id
});


export const updateEmployee = (employee: EmployeeFormValue): EmployeeActionTypes => ({
    type: UPDATE_EMPLOYEE,
    payload: employee
});

export const setUpdatedEmployee = (employee: Employee): EmployeeActionTypes => ({
    type: SET_UPDATED_EMPLOYEE,
    payload: employee
});
