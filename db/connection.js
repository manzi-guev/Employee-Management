/* eslint-disable import/no-mutable-exports */
/* eslint-disable node/no-unsupported-features/es-syntax */
import {
    Pool
} from 'pg';
import dotenv from 'dotenv';

dotenv.config();
let pool;
/* istanbul ignore else */
if (process.env.NODE_ENV === 'TEST') {
    pool = new Pool({
        connectionString: process.env.DB_TEST
    });
} else {
    pool = new Pool({
        connectionString: process.env.DATABASE_URL
    });
}

export default pool;