import { Model } from 'objection';
import Category from '../categories/category.model';
import Order from '../orders/order.model';
import Author from '../authors/author.model';
import SaleBook from '../saleBooks/saleBook.model';

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
          from: 'books.category_id',
          to: 'categories.id',
        },
      },
      orders: {
        relation: Model.ManyToManyRelation,
        modelClass: Order,
        join: {
          from: 'books.id',
          through: {
            from: 'orders_books.book_id',
            to: 'orders_books.order_id',
          },
          to: 'orders.id',
        },
      },
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: Author,
        join: {
          from: 'books.author_id',
          to: 'authors.id',
        },
      },
      sale_books: {
        relation: Model.HasManyRelation,
        modelClass: SaleBook,
        join: {
          from: 'books.id',
          to: 'sale_books.book_id',
        },
      },
    };
  }
}

export default Book;
