import { Model } from 'objection';
// import Order from '../orders/order.model';

class User extends Model {
  email!: string;

  password!: string;

  static get tableName() {
    return 'users';
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
