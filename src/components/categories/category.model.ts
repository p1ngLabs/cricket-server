import { Model } from 'objection';
import Book from '../books/book.model';

class Category extends Model {
  static get tableName() {
    return 'categories';
  }

  static get relationMappings() {
    return {
      books: {
        relation: Model.HasManyRelation,
        modelClass: Book,
        join: {
          from: 'categories.id',
          to: 'book.category_id',
        },
      },
    };
  }
}

export default Category;
