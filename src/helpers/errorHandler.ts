import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({
    message: err.message,
    stack: err.stack,
  });
};

export default errorHandler;
