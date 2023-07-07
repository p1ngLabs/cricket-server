import httpStatus from 'http-status';
import ApiError from '../../utils/apiError';
import User from './user.model';

export const getAllUsers = async () => {
  const users = await User.query()
    .select('id', 'username', 'email', 'phone', 'avatar')
    .where('role', 'customer');
  return users;
};

export const getUserById = async (id: string) => {
  const user = await User.query().where('id', id).first();
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  return user;
};
