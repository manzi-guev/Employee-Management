/* eslint-disable node/no-unsupported-features/es-syntax */
const createUser = `CREATE TABLE IF NOT EXISTS users (
    name text,
    nationalId text UNIQUE,
    phonenumber text UNIQUE,
    email text UNIQUE,
    password text,
    dateOfBirth text,
    status text,
    position text
)`;
const insertUser = `INSERT INTO users (
name,
nationalId,
phonenumber,
email,
password,
dateOfBirth,
status,
position
) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT DO NOTHING returning *`;
const findUser = `select * from users where email = ($1)`;

export default {
    createUser,
    insertUser,
    findUser
};