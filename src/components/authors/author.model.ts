import { Model } from 'objection';
import Book from '../books/book.model';

class Author extends Model {
  static get tableName() {
    return 'authors';
  }

  static get relationMappings() {
    return {
      books: {
        relation: Model.ManyToManyRelation,
        modelClass: Book,
        join: {
          from: 'authors.id',
          through: {
            from: 'books_authors.authorId',
            to: 'books_authors.bookId',
          },
          to: 'books.id',
        },
      },
    };
  }
}

export default Author;
