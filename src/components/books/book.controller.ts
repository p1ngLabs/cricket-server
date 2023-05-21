import { Request, Response } from 'express';
import httpStatus from 'http-status';
import asyncHandler from '../../helpers/asyncHandler';
import * as bookService from './book.service';

export const getNewReleaseBooks = asyncHandler(
  async (req: Request, res: Response) => {
    const books = await bookService.getNewReleaseBooks();
    res.status(httpStatus.OK).json(books);
  }
);

export const getBooks = asyncHandler(async (req: Request, res: Response) => {
  const books = await bookService.getBooks();
  res.status(httpStatus.OK).json(books);
});
