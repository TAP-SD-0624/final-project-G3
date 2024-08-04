import express, { Express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import authRouter from './routes/authRoutes';
import errorController from './controllers/errorController';
import rateLimit from 'express-rate-limit';
import { endpointNotImplemented, tooManyRequests } from './controllers/suspicionController';

const app: Express = express();

// to log any http request to the server
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// limit the number of requests sent to the server to under 500 requests per minute.
app.use(rateLimit({
    windowMs: 1000 * 60, // time in ms
    limit: 500,
    handler: tooManyRequests    
}));

// authentication routes
app.use('/api/auth', authRouter);

// whenever a user sends a request to an unimplemented endpoint, they will get a 404 status code response
app.route('*').all(endpointNotImplemented);

// pass errors to the global error controller
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    errorController(err, req, res, next)
});

export default app;