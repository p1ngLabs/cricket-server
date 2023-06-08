import httpStatus from 'http-status';
import bcrypt from 'bcryptjs';
import { UserRegister } from '../../@types/components/user';
import User from '../../components/users/user.model';
import ApiError from '../../helpers/apiError';

export const register = async (body: UserRegister) => {
  // https://stackoverflow.com/questions/37970743/postgresql-unique-violation-7-error-duplicate-key-value-violates-unique-const
  const existing = await User.query().findOne('email', body.email);
  if (existing)
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already exists');
  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(body.password, salt);
  await User.query().insert({ ...body, password: hashed });
};

export const forgotPassword = () => {};
