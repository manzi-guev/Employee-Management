import express from 'express';
import {
    signUp,
    signIn
} from '../middleware/validation';
import userController from '../controllers/user';

const route = express();
route.post('/user/signup', signUp, userController.signup);
route.post('/user/signin', signIn, userController.signin);
export default route;