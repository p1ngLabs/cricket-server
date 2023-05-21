import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import httpStatus from 'http-status';
import { Model } from 'objection';
import knexInstance from '../database';
import apiRoutes from './api/v1';
import errorHandler from './helpers/errorHandler';

const app = express();

Model.knex(knexInstance);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/v1', apiRoutes);
app.get('/', (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({ message: 'Welcome to Cricket server' });
});

app.use(errorHandler);

export default app;
