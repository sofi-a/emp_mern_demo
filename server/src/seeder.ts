import faker from 'faker';
import Employee, { IEmployee } from './models/employee.model';

export const createEmployee = () => {
    const name: string = faker.name.findName();

    return {
        name,
        name_lc: name.toLowerCase(), 
        dob: faker.date.past(faker.random.number(40)),
        gender: faker.random.arrayElement<string>(['female', 'male']),
        salary: faker.random.float({
            min: 650.00,
            max: 29000.00,
            precision: 2
        })
    }
};

export const createEmployees = async (numEmployees: number) => {
    if(await Employee.countDocuments() === 0) {
        console.log('Seeding Employees ...');
        const employees = [];
        for(let i = 0; i < numEmployees; i++) employees.push({...createEmployee()});
        Employee.insertMany(
            employees,
            (err, employees) => {
                if(!err) {
                    console.log(`Added ${numEmployees} employees to the database`);
                    console.log(employees);
                } else {
                    console.error('Error seeding employees')
                    console.error(err);
                }
            }
        );
    }
}
