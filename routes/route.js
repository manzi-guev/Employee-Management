import express from 'express';
import {
    signUp,
    signIn,
    createEmployee,
    activateEmp,
    suspendEmp
} from '../middleware/validation';
import employeeController from '../controllers/employees';
import token from '../middleware/token';
import userController from '../controllers/user';

const route = express();
route.post('/user/signup', signUp, userController.signup);
route.post('/user/signin', signIn, userController.signin);
route.post('/employees', token, createEmployee, employeeController.create);
route.get('/employees', token, employeeController.viewEmployees);
route.delete('/employees/:id', token, employeeController.delete);
route.put('/employees/:id/activate', token, activateEmp, employeeController.activate);
route.put('/employees/:id/suspend', token, suspendEmp, employeeController.suspend);
export default route;