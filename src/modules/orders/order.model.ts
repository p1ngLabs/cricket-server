import { Model } from 'objection';
import User from '../users/user.model';
import Book from '../books/book.model';

class Order extends Model {
  static get tableName() {
    return 'orders';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'orders.user_id',
          to: 'users.id',
        },
      },
      books: {
        relation: Model.ManyToManyRelation,
        modelClass: Book,
        join: {
          from: 'orders.id',
          through: {
            from: 'orders_books.order_id',
            to: 'orders_books.book_id',
          },
          to: 'books.id',
        },
      },
    };
  }
}

export default Order;
