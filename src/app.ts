/* eslint-disable no-console */
import express, { Request, Response } from 'express';
import path from 'node:path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import httpStatus from 'http-status';
import { Model } from 'objection';
import passport from 'passport';
import expressSession from 'express-session';
import knexInstance from '../database';
import apiRoutes from './api/v1';
import errorHandler from './utils/errorHandler';
import corsOptions from '../config/cors';
import sessionOptions from '../database/session';
import passportInit from '../config/passport';

const app = express();

Model.knex(knexInstance);

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(expressSession(sessionOptions));
app.use(passport.session());
passportInit();

app.get('/', (req: Request, res: Response) => {
  console.log(`Session ID: ${req.sessionID}`);
  console.log(req.cookies);
  res.status(httpStatus.OK).json({ message: 'Welcome to Cricket server' });
});
app.use('/v1', apiRoutes);
app.use('*', (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({ message: 'Endpoint not found' });
});

app.use(errorHandler);

export default app;
