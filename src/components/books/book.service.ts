import httpStatus from 'http-status';
import knex from '../../../database';
import ApiError from '../../helpers/apiError';

export const getBooks = async () => {
  const books = await knex('books')
    .select('id', 'title', 'publisher', 'price', 'isbn', 'thumbnail')
    .offset(5)
    .limit(10);
  if (books.length === 0)
    throw new ApiError(httpStatus.NOT_FOUND, 'Books not found');
  return books;
};

export const getNewReleaseBooks = async () => {
  const books = await knex('books')
    .select('id', 'title', 'publisher', 'price', 'isbn', 'thumbnail')
    .limit(5);
  if (books.length === 0)
    throw new ApiError(httpStatus.NOT_FOUND, 'Books not found');
  return books;
};
