import chai from 'chai';
import http from 'chai-http';
import {
    describe,
    it
} from 'mocha';
import dotenv from 'dotenv';
import app from '../app';
import gentoken from '../helpers/helperToken';

dotenv.config();

chai.use(http);
chai.should();

const realtoken = gentoken('abdoul@gmail.com');
const faketoken = gentoken('manzi@gmail.com');

const user = {
    name: 'Nuru',
    nationalId: '1111111111111111',
    phonenumber: '+250785802789',
    email: 'abdoul@gmail.com',
    dateOfBirth: '1996-01-01',
    password: 'nurureal'
};
const user2 = {
    name: 'Nuru',
    nationalId: '1111111111111112',
    phonenumber: '+250785802785',
    email: 'abdou@gmail.com',
    dateOfBirth: '1996-01-01',
    password: 'nurureal'
};
const employee = {
    employeeName: 'Manzi',
    nationalId: '1997800538320114',
    phoneNumber: '0785802789',
    email: 'manziguevara@gmail.com',
    dateOfBirth: '1997-01-23',
    position: 'Chief Executive Officer'

}
const emptyemployee = {
    employeeName: '',
    nationalId: '1997800538320114',
    phoneNumber: '0785802789',
    email: 'manziguevara@gmail.com',
    dateOfBirth: '1997-01-23',
    position: 'Chief Executive Officer'
}
const login = {
    email: 'abdoul@gmail.com',
    password: 'nurureal'
};
const login2 = {
    email: 'abdou@gmail.com',
    password: 'nurureal'
};
const usercatch = {
    password: 'nurureal'
};
const usercheck = {
    email: 'abd@gmail.com',
    password: 'nuru'
};
const userpass = {
    email: 'abdoul@gmail.com',
    password: 'nuru'
};
const status = {
    status: 'activated'
};
const statusempty = {
    status: ''
};
const nouser = {};
describe('User tests', () => {
    it('Not authorized', done => {
        chai
            .request(app)
            .post('/employees')
            .set('token', realtoken)
            .send(nouser)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have.property('error', 'Not authorized, Please logIn');
                done();
            });
    });
    it('User should be able to create an account', done => {
        chai
            .request(app)
            .post('/user/signup')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property('message', 'Manager succesfully created');
                res.body.should.have.property('token');
                done();
            });
    });
    it('Another User should be able to create an account', done => {
        chai
            .request(app)
            .post('/user/signup')
            .send(user2)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property('message', 'Manager succesfully created');
                res.body.should.have.property('token');
                done();
            });
    });
    it('Cannot create account if User already exists', done => {
        chai
            .request(app)
            .post('/user/signup')
            .send(user)
            .end((err, res) => {
                res.should.have.status(409);
                res.body.should.have.property('error', 'Manager already exists');
                done();
            });
    });
    it('User must be able to login', done => {
        chai
            .request(app)
            .post('/user/signin')
            .send(login)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message', 'User successfully logged in');
                done();
            });
    });
    it('Another User must be able to login', done => {
        chai
            .request(app)
            .post('/user/signin')
            .send(login2)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message', 'User successfully logged in');
                done();
            });
    });
    it('When no email is passed', done => {
        chai
            .request(app)
            .post('/user/signin')
            .send(usercatch)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('error', '"email" is required');
                done();
            });
    });
    it('Fiels required', done => {
        chai
            .request(app)
            .post('/user/signup')
            .send(usercatch)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('error', '"name" is required');
                done();
            });
    });
    it('User doesnt exist', done => {
        chai
            .request(app)
            .post('/user/signin')
            .send(usercheck)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property(
                    'error',
                    'Manager with provided email doesnt exist'
                );
                done();
            });
    });
    it('Incorrect Password Provided', done => {
        chai
            .request(app)
            .post('/user/signin')
            .send(userpass)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have.property('error', 'Password is incorrect');
                done();
            });
    });
});
describe('Employee Tests', () => {
    it('No employee found', done => {
        const id = 10;
        chai
            .request(app)
            .put(`/employees/${id}/activate`)
            .set('token', realtoken)
            .send(status)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property('error', 'Employee not found');
                done();
            });
    });
    it('Viewing employees that dont exist', done => {
        chai
            .request(app)
            .get('/employees')
            .set('token', realtoken)
            .send()
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property('error', 'Employees not found');
                done();
            });
    });

    it('Suspending an Employee that doesnt exist', done => {
        const id = 1;
        chai
            .request(app)
            .put(`/employees/${id}/suspend`)
            .set('token', realtoken)
            .send(status)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property('error', 'Employee not found');
                done();
            });
    });
    it('Employee created', done => {
        chai
            .request(app)
            .post('/employees')
            .set('token', realtoken)
            .send(employee)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property(
                    'message',
                    'Employee successfully created'
                );
                done();
            });
    });
    it('Employee created with same credentials', done => {
        chai
            .request(app)
            .post('/employees')
            .set('token', realtoken)
            .send(employee)
            .end((err, res) => {
                res.should.have.status(409);
                res.body.should.have.property(
                    'error',
                    'Employee with given details already exists'
                );
                done();
            });
    });
    it('Employee having empty fields', done => {
        chai
            .request(app)
            .post('/employees')
            .set('token', realtoken)
            .send(emptyemployee)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property(
                    'error',
                    '"employeeName" is not allowed to be empty'
                );
                done();
            });
    });
    it('Viewing all redflags', done => {
        chai
            .request(app)
            .get('/employees')
            .set('token', realtoken)
            .send(employee)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property(
                    'message',
                    'List of all Employees'
                );
                done();
            });
    });
    it('Activating an Employee', done => {
        const id = 1;
        chai
            .request(app)
            .put(`/employees/${id}/activate`)
            .set('token', realtoken)
            .send(status)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message', 'Employee Activated');
                done();
            });
    });
    it('Suspending an Employee', done => {
        const id = 1;
        chai
            .request(app)
            .put(`/employees/${id}/suspend`)
            .set('token', realtoken)
            .send(status)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message', 'Employee Suspended');
                done();
            });
    });
    it('Suspending an Employee without changing status', done => {
        const id = 1;
        chai
            .request(app)
            .put(`/employees/${id}/suspend`)
            .set('token', realtoken)
            .send(statusempty)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('error', '"status" is not allowed to be empty');
                done();
            });
    });
    it('Activating an Employee without changing status', done => {
        const id = 1;
        chai
            .request(app)
            .put(`/employees/${id}/activate`)
            .set('token', realtoken)
            .send(statusempty)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('error', '"status" is not allowed to be empty');
                done();
            });
    });
    it('Deleting an employee', done => {
        const id = 1;
        chai
            .request(app)
            .delete(`/employees/${id}`)
            .set('token', realtoken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property(
                    'message',
                    'Employee successfully deleted'
                );
                done();
            });
    });
    it('Deleting a redflag that doesnt exist', done => {
        const id = 3;
        chai
            .request(app)
            .delete(`/employees/${id}`)
            .set('token', realtoken)
            .send()
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.have.property('error', 'Employee not found');
                done();
            });
    });
});
describe('App Test', () => {
    it('Welcome message', done => {
        chai
            .request(app)
            .get('/')
            .send()
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message', 'Welcome to Challenge 3');
                done();
            });
    });
});
describe('Token Test', () => {
    it('No token found', done => {
        chai
            .request(app)
            .post('/employees')
            .send()
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have.property('error', 'No token found');
                done();
            });
    });
    it('Jwt malformed token', done => {
        chai
            .request(app)
            .post('/employees')
            .set('token', 'hello')
            .send()
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('error');
                done();
            });
    });
    it('Jwt malformed token', done => {
        const id = 2;
        chai
            .request(app)
            .put(`/employees/${id}/activate`)
            .set('token', 'hello')
            .send()
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('error');
                done();
            });
    });
    it('Invalid Signature', done => {
        chai
            .request(app)
            .post('/employees')
            .set('token', `${realtoken}sbvs`)
            .send()
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.have.property('error', 'invalid signature');
                done();
            });
    });
});