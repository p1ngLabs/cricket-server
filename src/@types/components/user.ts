export interface UserRegister {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface PassportUser extends Express.User {
  id?: string;
}
