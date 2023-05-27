import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import httpStatus from 'http-status';
import path from 'path';
import { Model } from 'objection';
import knexInstance from '../database';
import apiRoutes from './api/v1';
import errorHandler from './helpers/errorHandler';
import corsOptions from '../config/cors';

const app = express();

Model.knex(knexInstance);

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) => {
  res.status(httpStatus.OK).json({ message: 'Welcome to Cricket server' });
});
app.use('/v1', apiRoutes);
app.use('*', (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({ message: 'Endpoint not found' });
});

app.use(errorHandler);

export default app;
