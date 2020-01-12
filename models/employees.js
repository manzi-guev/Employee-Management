const createEmployee = `CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    employeeName text,
    nationalId text UNIQUE,
    phoneNumber text UNIQUE,
    email text UNIQUE,
    dateOfBirth text,
    status text,
    position text
)`;
const insertEmployee = `INSERT INTO employees (
   employeeName,
   nationalId,
   phoneNumber,
   email,
   dateOfBirth,
   status,
   position
  ) VALUES ($1,$2,$3,$4,$5,$6,$7) ON CONFLICT DO NOTHING returning *`;
const findemployees = `select * from employees`;
const findspecific = `select * from employees where id = ($1)`;
const deleteEmp = `delete from employees where id = ($1)`;
const activate = `UPDATE employees SET status = $2 where id = $1`;
export default {
  createEmployee,
  insertEmployee,
  findemployees,
  findspecific,
  deleteEmp,
  activate
};