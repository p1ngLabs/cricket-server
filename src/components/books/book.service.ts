import httpStatus from 'http-status';
import ApiError from '../../helpers/apiError';
import Book from './book.model';
import Author from '../authors/author.model';

export const getAllBooks = async () => {
  const books = await Book.query()
    .select(
      'id',
      'title',
      'description',
      'price',
      'publisher',
      'isbn',
      'thumbnail'
    )
    .limit(10);
  if (books.length === 0)
    throw new ApiError(httpStatus.NOT_FOUND, 'Books not found');
  return books;
};

export const getBookById = async (id: string | number) => {
  const book: any = await Book.query()
    .select(
      'id',
      'author_id',
      'title',
      'description',
      'publisher',
      'price',
      'current_stock',
      'pages',
      'dimensions',
      'language',
      'isbn',
      'thumbnail'
    )
    .findById(id);
  if (!book) throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  const author: any = await Author.query().findById(book.author_id);

  return { ...book, author: author.name };
};
