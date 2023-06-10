import { MaybeCompositeId, Model } from 'objection';
import User from '../users/user.model';

class SocialProfile extends Model {
  userId!: MaybeCompositeId;

  static get tableName() {
    return 'social_profiles';
  }

  static get relationMappings() {
    return {
      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'social_profiles.userId',
          to: 'users.id',
        },
      },
    };
  }
}

export default SocialProfile;
