import { Model } from 'objection';
import Book from '../books/book.model';

class Author extends Model {
  static get tableName() {
    return 'authors';
  }

  static get relationMappings() {
    return {
      books: {
        relation: Model.HasManyRelation,
        modelClass: Book,
        join: {
          from: 'authors.id',
          to: 'books.author_id',
        },
      },
    };
  }
}

export default Author;
