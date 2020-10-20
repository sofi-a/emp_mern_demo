import { Alert, Employee, ResponsePage } from '../models';

export const SET_LOADING = 'SET_LOADING';

export interface SetLoadingAction {
    type: typeof SET_LOADING;
    payload: boolean;
}

export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';

interface SetAlertAction {
    type: typeof SET_ALERT;
    payload: Alert;
}

interface RemoveAlertAction {
    type: typeof REMOVE_ALERT;
    payload: Alert;
}

export type AlertActionTypes = SetAlertAction | RemoveAlertAction;

export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const GET_EMPLOYEES = 'GET_EMPLOYEES';
export const REMOVE_EMPLOYEE = 'REMOVE_EMPLOYEE';
export const FILTER_REMOVED_EMPLOYEE = 'FILTER_REMOVED_EMPLOYEE'
export const SET_EMPLOYEE = 'SET_EMPLOYEE';
export const SET_EMPLOYEES = 'SET_EMPLOYEES';
export const UPDATE_EMPLOYEE = 'UPADTE_EMPLOYEE';
export const SET_UPDATED_EMPLOYEE = 'SET_UPDATED_EMPLOYEE';

interface AddEmployeeAction {
    type: typeof ADD_EMPLOYEE;
    payload: Employee;
}

interface SetEmployeeAction {
    type: typeof SET_EMPLOYEE;
    payload: Employee;
}

interface SetEmployeesAction {
    type: typeof SET_EMPLOYEES;
    payload: ResponsePage;
}

interface RemoveEmployeeAction {
    type: typeof REMOVE_EMPLOYEE;
    payload: string;
}

interface FilterRemovedEmployeeAction {
    type: typeof FILTER_REMOVED_EMPLOYEE;
    payload: string;
}

interface UpdateEmployeeAction {
    type: typeof UPDATE_EMPLOYEE;
    payload: Employee;
}

interface SetUpdatedEmployeeAction {
    type: typeof SET_UPDATED_EMPLOYEE;
    payload: Employee;
}

export type EmployeeActionTypes = AddEmployeeAction             |
                                  SetEmployeeAction             |
                                  SetEmployeesAction            |
                                  RemoveEmployeeAction          |
                                  FilterRemovedEmployeeAction   |
                                  UpdateEmployeeAction          |
                                  SetUpdatedEmployeeAction;

export interface PageQuery {
    limit?: number;
    page?: number;
    order?: string;
    search?: string;
}

export interface GetEmployeesAction {
    type: typeof GET_EMPLOYEES;
    payload: PageQuery;
}
