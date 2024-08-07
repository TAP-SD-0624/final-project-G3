import { Router } from 'express';
import { signup, login, logout } from '../controllers/authController';
import { methodNotAllowed } from '../controllers/suspicionController';
import { registerValidation, loginValidation } from '../validators/auth/authFieldsValidation';
import validateRequest from '../middlewares/validateRequest'; // Import optional middleware to handle validation errors

import  authMiddleware  from '../middlewares/authMiddleware'; // Import authenticate middleware
import adminMiddleware from '../middlewares/adminMiddleware';

const authRouter = Router();  

authRouter.route('/signup').post(registerValidation(), validateRequest, signup);
authRouter.route('/login').post(loginValidation(), validateRequest, login);
authRouter.route('/logout').get(logout);
 

// Apply authMiddleware first to ensure `req.user` is set
authRouter.use(authMiddleware); 
authRouter.route('/protected').get( (req, res) => {
  res.send('Hello, authenticated user!');
});


authRouter.route('*').all(methodNotAllowed);

export default authRouter;

 