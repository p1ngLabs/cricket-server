import { Model } from 'objection';
// import Order from '../orders/order.model';

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      require: ['id', 'username', 'email', 'password'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
      },
    };
  }

  // static get relationMappings() {
  //   return {
  //     orders: {
  //       relation: Model.HasManyRelation,
  //       modelClass: Order,
  //       join: {
  //         from: 'users.id',
  //         to: 'orders.user_id',
  //       },
  //     },
  //   };
  // }
}

export default User;
