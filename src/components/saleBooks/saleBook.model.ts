import { Model } from 'objection';
import Book from '../books/book.model';

class SaleBook extends Model {
  static get tableName() {
    return 'sale_books';
  }

  static get relationMappings() {
    return {
      book: {
        relation: Model.BelongsToOneRelation,
        modelClass: Book,
        join: {
          from: 'sale_books.book_id',
          to: 'books.id',
        },
      },
    };
  }
}

export default SaleBook;
