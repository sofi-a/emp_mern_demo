import { Response, Request, Router } from 'express';
import { check } from 'express-validator';
import EmployeeController from '../controllers/employee.controller';

const router: Router = Router();

const controller = new EmployeeController();

router.get('/employees', controller.index);
router.get('/employees/:id', controller.show);
router.post('/employees', [
    check('name')
        .not()
        .isEmpty().withMessage('Name is required')
        .isString().withMessage('Name must be a string'),
    check('dob')
        .not()
        .isEmpty().withMessage('Date of birth is required')
        .isDate().withMessage('Date must have a YYYY/MM/DD format'),
    check('gender')
        .not()
        .isEmpty().withMessage('Gender is required')
        .isIn(['female', 'male']).withMessage('Gender must be either male or female'),
    check('salary')
        .not()
        .isEmpty().withMessage('Salary is required')
        .isNumeric().withMessage('Salary must be a number')
], controller.store);
router.put('/employees/:id', [
    check('name')
        .optional(true)
        .isString().withMessage('Name must be a string'),
    check('dob')
        .optional(true)
        .isDate().withMessage('Date must have a YYYY/MM/DD format'),
    check('gender')
        .optional(true)
        .isIn(['female', 'male']).withMessage('Gender must be either male or female'),
    check('salary')
        .optional(true)
        .isNumeric().withMessage('Salary must be a number')
], controller.update);
router.delete('/employees/:id', controller.destroy);

export default router;
