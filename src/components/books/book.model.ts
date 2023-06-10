import { Model } from 'objection';
import Category from '../categories/category.model';
import Order from '../orders/order.model';
import Author from '../authors/author.model';

class Book extends Model {
  static get tableName() {
    return 'books';
  }

  static get relationMappings() {
    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: 'books.categoryId',
          to: 'categories.id',
        },
      },
      orders: {
        relation: Model.ManyToManyRelation,
        modelClass: Order,
        join: {
          from: 'books.id',
          through: {
            from: 'orders_books.bookId',
            to: 'orders_books.orderId',
          },
          to: 'orders.id',
        },
      },
      authors: {
        relation: Model.ManyToManyRelation,
        modelClass: Author,
        join: {
          from: 'books.id',
          through: {
            from: 'books_authors.bookId',
            to: 'books_authors.authorId',
          },
          to: 'authors.id',
        },
      },
    };
  }
}

export default Book;
