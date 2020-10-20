import axios from 'axios';
import { PageQuery } from '../actions/types';
import { Employee, EmployeeFormValue } from '../models';

axios.defaults.baseURL = 'http://localhost:8000';

export const getEmployees = async (query: PageQuery) => {
    const { search, limit, page, order } = query;
    let uri = '/api/employees?';

    uri += search ? `&search=${search}` : '';
    uri += (limit || limit === 0) ? `&limit=${limit}` : '';
    uri += (page || page === 0) ? `&page=${page + 1}` : '';
    uri += order ? `&page=${order}` : '';

    return axios.get(uri);
}

export const getEmployee = async (id: string) => axios.get(`/api/employees/${id}`);

export const postEmployee = async (employee: EmployeeFormValue) => axios.post('/api/employees', employee);

export const putEmployee = async (employee: Employee) => axios.put(`/api/employees/${employee._id}`, employee);

export const deleteEmployee = async (id: string) => axios.delete(`/api/employees/${id}`);
