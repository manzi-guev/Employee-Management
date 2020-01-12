/* eslint-disable node/no-unsupported-features/es-syntax */
import con from './connection';

const dropTables = async () => {
  await con.query('DROP TABLE employees');
  await con.query('delete from users');
};
dropTables();
export default dropTables;