import chai from 'chai';
import http from 'chai-http';
import { describe, it } from 'mocha';
import dotenv from 'dotenv';
import app from '../app';

dotenv.config();

chai.use(http);
chai.should();

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
describe('User tests', () => {
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
