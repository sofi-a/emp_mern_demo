import { Response, Request } from 'express';
import { validationResult } from 'express-validator';
import Employee, { IEmployee } from '../models/employee.model';
import Controller, { Page, PageLinks } from './controller';
import { rootUrl } from '../config/constants';

class EmployeeController extends Controller {
    async index(req: Request, res: Response) {
        const employeesCount : number = await Employee.countDocuments();
        const search: string | null = req.query.search ? String(req.query.search) : null;
        const searchResultCount: number = search ?
            await Employee.countDocuments({ name_lc: { $regex: new RegExp(search, 'i') } }) : 0;
        const limit: number = req.query.limit ?
            Number(req.query.limit) === 0 ? search ? searchResultCount : employeesCount : 
            Number(req.query.limit) : 10;
        const page: number = req.query.page ? Number(req.query.page) : 1;
        const offset: number = limit * (page - 1);
        const lastPage: number = search ? (
            searchResultCount > limit ? Math.ceil(searchResultCount/limit) : page
        ) : employeesCount > limit ? Math.ceil(employeesCount/limit) : page;

        const pageMeta = (employees: IEmployee[]): Page => ({
            current_page: (employees.length > 0) ? page : 0,
            per_page: limit,
            from: (employees.length > 0) ? offset + 1 : 0,
            to: (employees.length > 0) ? offset + employees.length : 0,
            total: search ? searchResultCount : employeesCount ,
            last_page: (employees.length > 0) ? lastPage : 0
        });

        const pageLinks: PageLinks = {
            first: search ?
                rootUrl + `api/employees?search=${search}&limit=${limit}&page=1` :
                `api/employees?limit=${limit}&page=1`,
            last: search ?
                rootUrl + `api/employees?search=${search}&limit=${limit}&page=${lastPage}` :
                `api/employees?limit=${limit}&page=${lastPage}`,
            next: page !== lastPage ? (
                search ?
                    rootUrl + `api/employees?search=${search}&limit=${limit}&page=${page + 1}` :
                    `api/employees?limit=${limit}&page=${page + 1}`
            ) : undefined,
            prev: page > 1 ? (
                search ?
                    rootUrl + `api/employees?search=${search}&limit=${limit}&page=${page - 1}` :
                    `api/employees?limit=${limit}&page=${page - 1}`
            ) : undefined
        };

        const callback: (err: Error, employees: IEmployee[]) => void = (err: Error, employees: IEmployee[]) => {
            const meta = employees.length > 0 ? {
                page: pageMeta(employees),
                links: pageLinks
            } : { page: pageMeta([]), links: pageLinks };
            if(!err) return res.json({
                meta,
                data: employees
            });
            res.status(400).json(err);
        };

        let order: string = String(req.query.order);
        order =  (order && (order === 'asc' ||  order === 'desc')) ? order : 'desc';

        search ?
            Employee.find({ name_lc: { $regex: new RegExp(search, 'i') } }, callback)
                    .skip(offset)
                    .limit(limit)
                    .sort({ _id: order })
                    .select('-name_lc -__v') :
            Employee.find({}, callback)
                    .skip(offset)
                    .limit(limit)
                    .sort({ _id: order })
                    .select('-name_lc -__v');
    }

    async show(req: Request, res: Response) {
        const empId: string = req.params.id;
        
        Employee.findById(empId, (err, employee) => {
            if(!err) return res.json({ data: employee });
            res.status(400).json(err);
        }).select('-name_lc -__v');
    }

    async store(req: Request, res: Response) {
        const errors = validationResult(req);
        const {
            name,
            dob,
            gender,
            salary
        } = req.body;

        if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        Employee.create({
            name,
            name_lc: name.toLowerCase(),
            dob,
            gender,
            salary
        }, (err: Error, employees: IEmployee[]) => {
            if(!err) return res.json({ data: employees });
            res.status(400).json(err);
        });
    }

    async update(req: Request, res: Response) {
        const empId: string = req.params.id;
        const errors = validationResult(req);
        const {
            name,
            dob,
            gender,
            salary
        } = req.body;

        if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        else {
            Employee.findById(empId, (err: Error, employee: IEmployee | null) => {
                if(!err) {
                    if(employee) {
                        if(name || dob || gender || salary) {
                            employee.name = name ? name : employee.name;
                            employee.name_lc = name ? name.toLowerCase() : employee.name_lc;
                            employee.dob = dob ? dob : employee.dob;
                            employee.gender = gender ? gender : employee.gender;
                            employee.salary = salary ? salary : employee.salary;
    
                            Employee.updateOne(
                                { _id: empId },
                                employee,
                                { new: true },
                                (err) => {
                                    if(!err) return res.json({ data: employee });
                                    res.status(400).json(err);
                                }
                            );
                        } else res.status(400).json({ error: { msg: 'At least one field is required to update an employee' } });
                    } else res.status(400).json({ error: { msg: `Employee with id ${empId} doesn't exist` } });
                } else res.status(400).json(err);
            });
        }
    }

    async destroy(req: Request, res: Response) {
        const empId: string = req.params.id;

        Employee.findOneAndDelete({ _id: empId }, (err, employee) => {
            if(!err) return res.json({ data: employee });
            res.status(400).json(err);
        });
    }
}

export default EmployeeController;
