export type Variant = 'success' | 'warning' | 'info' | 'error';

export interface Alert {
    id: string,
    message: string;
    type: Variant;
    open: boolean;
    timeout: number;
}

export interface Employee {
    _id?: string;
    name?: string;
    dob?: string;
    gender?: string;
    salary?: number;
}

export interface EmployeeFormValue {
    _id?: string,
    name: string,
    dob: string;
    gender: string;
    salary: number;
}

export interface Page {
    current_page: number;
    per_page: number;
    from: number;
    to: number;
    total: number;
    last_page: number;
}

export interface Links {
    first: string;
    last: string;
    next?: string;
    prev?: string;
}

export interface PageMeta {
    page?: Page;
    links: Links;
}

export interface ResponsePage {
    meta: PageMeta;
    data: Employee[];
}

export interface RootState {
    loading: boolean;
    alerts: Alert[];
    employees: ResponsePage;
}
