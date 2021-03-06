import { Resolver, Mutation, Arg } from 'type-graphql';
import { hashPassword } from '../../../utils/auth';
import User from '../../../entity/User';
import RegisterInput from './Register.Input';
import EmailConfirmation from '../../../entity/EmailConfirmation';
import sendConfirmationEmail from '../../../utils/sendConfirmationEmail';

import uuid = require('uuid');

// TODO: add email confirmation
@Resolver()
export default class RegisterResolver {
  @Mutation(() => User)
  async register(@Arg('user')
  {
    email,
    firstName,
    lastName,
    username,
    password
  }: RegisterInput): Promise<User> {
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      email,
      firstName,
      lastName,
      username,
      password: hashedPassword,
      confirmed: false
    }).save();

    const id = uuid.v4();

    sendConfirmationEmail(email, `http://localhost:3000/user/confirm?id=${id}`);

    await EmailConfirmation.create({
      id,
      user: user.id,
      expiration: Date.now() + 24 * 60 * 60 * 1000
    }).save();

    return user;
  }
}
