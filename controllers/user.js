/* eslint-disable node/no-unsupported-features/es-syntax */
import bcrypt from 'bcryptjs';
import con from '../db/connection';
import users from '../models/users';
import tokengenerator from '../helpers/helperToken';

class userController {
    static async signup(req, res) {
        const {
            name,
            nationalId,
            phonenumber,
            email,
            password,
            dateOfBirth,
        } = req.body;
        const passwd = bcrypt.hashSync(password, 10);
        const status = 'active';
        const position = 'Manager';
        const newUser = await con.query(users.insertUser, [
            name,
            nationalId,
            phonenumber,
            email,
            passwd,
            dateOfBirth,
            status,
            position,
        ]);
        const finduser = await con.query(users.findUser, [email]);
        if (newUser.rowCount === 1) {
            return res.status(201).json({
                status: 201,
                token: tokengenerator(email),
                message: 'Manager succesfully created',
                data: {
                    name: finduser.rows[0].name,
                    nationalId: finduser.rows[0].nationalid,
                    phonenumber: finduser.rows[0].phonenumber,
                    email: finduser.rows[0].email,
                    dateOfBirth: finduser.rows[0].dateofbirth,
                    status: finduser.rows[0].status,
                    position: finduser.rows[0].position
                }
            });
        }
        return res.status(409).json({
            status: 409,
            error: 'Manager already exists'
        });
    }

    static async signin(req, res) {
        const {
            email,
            password
        } = req.body;
        const finduser = await con.query(users.findUser, [email]);
        if (finduser.rowCount === 0) {
            return res.status(404).json({
                status: 404,
                error: 'Manager with provided email doesnt exist'
            });
        }
        if (
            bcrypt.compareSync(password, finduser.rows[0].password) ||
            password === finduser.rows[0].password
        ) {
            return res.status(200).json({
                status: 200,
                token: tokengenerator(email),
                message: 'User successfully logged in'
            });
        }
        return res.status(401).json({
            status: 401,
            error: 'Password is incorrect'
        });
    }
}

export default userController;