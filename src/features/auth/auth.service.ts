import httpStatus from 'http-status';
import bcrypt from 'bcryptjs';
import _ from 'lodash';
import { PassportUser, UserRegister } from '../../@types/components/user';
import User from '../../modules/users/user.model';
import ApiError from '../../utils/apiError';

export const register = async (body: UserRegister) => {
  // https://stackoverflow.com/questions/37970743/postgresql-unique-violation-7-error-duplicate-key-value-violates-unique-const
  const existing = await User.query().findOne('email', body.email);
  if (existing)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exists');
  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(body.password, salt);
  const returned = await User.query()
    .insert({ ...body, password: hashed })
    .returning(['email', 'firstName', 'lastName', 'username']);
  const cleanUser = _.omit(returned, 'password');

  return cleanUser;
};

export const login = async (user: PassportUser) => {
  const cleanUser = _.omit(user, [
    'id',
    'password',
    'active',
    'created_at',
    'updated_at',
  ]);

  return cleanUser;
};

export const forgotPassword = () => {};
