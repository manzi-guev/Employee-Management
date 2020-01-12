/* eslint-disable no-unused-vars */
/* eslint-disable node/no-unsupported-features/es-syntax */
import jwt from 'jsonwebtoken';
import con from '../db/connection';
import users from '../models/users';

const checkToken = async (req, res, next) => {
  try {
    const takeToken = req.header('token');
    /* istanbul ignore else */
    if (!takeToken) {
      return res.status(401).json({
        status: 401,
        error: 'No token found'
      });
    }
    const {
      email
    } = jwt.verify(req.header('token'), process.env.KEY);
    const findUser = await con.query(users.findUser, [email]);
    /* istanbul ignore else */
    if (findUser.rowCount === 0) {
      return res.status(401).json({
        status: 401,
        error: 'Not authorized, Please logIn'
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error: error.message
    });
  }
  return null;
};
export default checkToken;