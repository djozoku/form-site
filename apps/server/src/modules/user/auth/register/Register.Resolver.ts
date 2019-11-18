import { Resolver, Mutation, Arg } from 'type-graphql';

import EmailConfirmation from '@module/user/emailConfirm/EmailConfirm.Entity';
import { sendConfirmationEmail } from '@module/user/emailConfirm/EmailConfirm.Utils';
import User from '@module/user/User.Entity';
import { hashPassword } from '@module/user/auth/Auth.Utils';

import RegisterInput from './Register.Input';

// FIXME: FIX THIS!!!
import uuid = require('uuid');

@Resolver()
export default class RegisterResolver {
  @Mutation(() => User)
  async register(
    @Arg('user')
    { email, firstName, lastName, username, password }: RegisterInput
  ): Promise<User> {
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