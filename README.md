[![Build Status](https://travis-ci.org/manzi-guev/Employee-Management-REST-API-Back-End.svg?branch=develop)](https://travis-ci.org/manzi-guev/Employee-Management-REST-API-Back-End)
[![Coverage Status](https://coveralls.io/repos/github/manzi-guev/Employee-Management-REST-API-Back-End/badge.svg?branch=develop)](https://coveralls.io/github/manzi-guev/Employee-Management-REST-API-Back-End?branch=develop)
# Employee-Management REST API

> What are we building?

We are building an Employee management REST API that will help managers all around the world to be able to add, delete, edit, suspend and activate employees.
> Who are we building it for?

Everyone in the world

> What are the required features?

- Sign Up
- Login
- Create an employee
- View all employees
- Delete an employee
- Edit an employee
- Activate an employee
- Suspend an employee

# API Endpoints

| Request Routes                 | Methods |                              Description | Completed |
| :----------------------------- | :-----: | ---------------------------------------: | :--------:|
| /user/signup            |  Post   |                        users can sign up | Yes|
| /user/sigin             |  Post   |                        users can sign in | Yes |
| /employees              |  Post   |            manager can create employee | Yes |
| /employees              |   Get   |              manager can view all employees | Yes|
| /employees/:id          | Delete  |                manager can delete employees | Yes|
| /employees/:id  |  Put  |  manager can edit employee | No|
| /employees/:id/activate  |  Put  |  manager can activate employee | Yes|
| /employees/:id/suspend |  Put  | manager can suspend employee | Yes|

# Validations
- Email and NationalId have been validated as requested
- Phone number has not been validated
- Registration age has not been validated

# Requirements
- Manager's password has been encrypted
- The system throws excpections messages when error occurs apart from Route error handling and Server error
# Authentication
- Done using JWT to generate token
- If not logged in, the manager is not authaurized to do anything. 
# API Documentation
[Documentation link](https://documenter.getpostman.com/view/8149811/SWLiZ62U)


# Backend, Frameworks and other tools used

- Node js
- Express
- Mocha and Chai(for testing)
- babel


# Installation Guide

To use this project locally you must install node js, then clone the project using

```
git clone https://github.com/manzi-guev/Employee-Management-REST-API-Back-End.git
```

after cloning the project, you must install all the project dependencies using

```
npm i
```

after that you are good to go, now you can run the project using

```
npm start
```

to test endpoints you will use a tool called postman.
and finally to run tests you can use

```
npm test
```

### Contributor

Manzi Guevara [manziguevara@gmail.com](manziguevara@gmail.com)

### Copyright

Copyright (c) Manzi Guevara
