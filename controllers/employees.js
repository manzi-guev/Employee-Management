import con from '../db/connection';
import employees from '../models/employees';

class employeeController {
    static async create(req, res) {
        const {
            employeeName,
            nationalId,
            phoneNumber,
            email,
            dateOfBirth,
            position
        } = req.body;
        const status = 'inactive';
        const newEmployee = await con.query(employees.insertEmployee, [
            employeeName,
            nationalId,
            phoneNumber,
            email,
            dateOfBirth,
            status,
            position
        ]);
        /* istanbul ignore else */
        if (newEmployee.rowCount === 1) {
            return res.status(201).json({
                status: 201,
                message: 'Employee successfully created',
                data: newEmployee.rows[0]
            });
        }
        return res.status(409).json({
            status: 409,
            error: 'Employee with given details already exists'
        });
    }
    static async viewEmployees(req, res) {
        const viewEmps = await con.query(employees.findemployees);
        /* istanbul ignore else */
        if (viewEmps.rowCount >= 1) {
            return res.status(200).json({
                status: 200,
                message: 'List of all Employees',
                data: viewEmps.rows
            });
        }
        return res.status(404).json({
            status: 404,
            error: 'Employees not found'
        });
    }
    static async delete(req, res) {
        const id = parseInt(req.params.id, 10);
        const foundEmp = await con.query(employees.findspecific, [id]);
        /* istanbul ignore else */
        if (foundEmp.rowCount !== 1) {
            return res.status(404).json({
                status: 404,
                error: 'Employee not found'
            });
        }
        const viewspecific = await con.query(employees.deleteEmp, [id]);
        /* istanbul ignore else */
        if (viewspecific.rowCount === 1) {
            return res.status(200).json({
                status: 200,
                message: 'Employee successfully deleted'
            });
        }
    }
    static async activate(req, res) {
        const id = parseInt(req.params.id, 10);
        const foundEmp = await con.query(employees.findspecific, [id]);
        /* istanbul ignore else */
        if (foundEmp.rowCount !== 1) {
            return res.status(404).json({
                status: 404,
                error: 'Employee not found'
            });
        }
        const {
            status
        } = req.body;
        const viewspecific = await con.query(employees.activate, [id, status]);
        /* istanbul ignore else */
        if (viewspecific.rowCount === 1) {
            return res.status(200).json({
                status: 200,
                message: 'Employee Activated',
                data: {
                    id: id,
                    status: status
                }
            });
        }
    }
    static async suspend(req, res) {
        const id = parseInt(req.params.id, 10);
        const foundEmp = await con.query(employees.findspecific, [id]);
        /* istanbul ignore else */
        if (foundEmp.rowCount !== 1) {
            return res.status(404).json({
                status: 404,
                error: 'Employee not found'
            });
        }
        const {
            status
        } = req.body;
        const viewspecific = await con.query(employees.activate, [id, status]);
        /* istanbul ignore else */
        if (viewspecific.rowCount === 1) {
            return res.status(200).json({
                status: 200,
                message: 'Employee Suspended',
                data: {
                    id: id,
                    status: status
                }
            });
        }
    }
}
export default employeeController;