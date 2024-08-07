// src/routes/index.ts

import express, { Request, Response } from 'express'; 
import { methodNotAllowed } from '../controllers/suspicionController';


const indexRouter = express.Router();

// Route to render index.ejs 

indexRouter.route('/').get((req: Request, res: Response) => {
  try {
    const message = 'Welcome to the Ecommerce System API!';
    res.status(200).send(message);
  } catch (err) {
      console.error('Error rendering index.ejs:', err);
      res.status(500).send('Internal Server Error');
  }
});
 

indexRouter.route('*').all(methodNotAllowed);

export default indexRouter  ;
