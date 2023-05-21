import { Model } from 'objection';

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
}

export default User;
