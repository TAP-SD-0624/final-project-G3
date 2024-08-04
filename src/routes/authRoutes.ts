import express, { Router } from 'express';
import { signup, login, logout } from '../controllers/authController';
import { methodNotAllowed } from '../controllers/suspicionController';

const authRouter: Router = express.Router();

authRouter.route('/signup').post(signup);
authRouter.route('/login').post(login);
authRouter.route('/logout').get(logout);

authRouter.route('*').all(methodNotAllowed);

export default authRouter;