/* eslint-disable node/no-unsupported-features/es-syntax */
import con from './connection';
import employees from '../models/employees';

const create = async () => {
    const createEmpTable = employees.createEmployee;
    const tables = `${createEmpTable}`;
    await con.query(tables);
};
create();

export default create;