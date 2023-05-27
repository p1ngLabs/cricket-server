import { Request, Response } from 'express';
import httpStatus from 'http-status';
import asyncHandler from '../../helpers/asyncHandler';
import * as bookService from './book.service';

export const getAllBooks = asyncHandler(async (req: Request, res: Response) => {
  const books = await bookService.getAllBooks();
  res.status(httpStatus.OK).json(books);
});

export const getBookById = asyncHandler(async (req: Request, res: Response) => {
  const book = await bookService.getBookById(req.params.id);
  res.status(httpStatus.OK).json(book);
});
