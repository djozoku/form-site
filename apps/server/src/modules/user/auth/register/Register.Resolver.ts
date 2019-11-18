import { Resolver, Mutation, Arg } from 'type-graphql';
import uuid from 'uuid';

import { UserValidator } from '@form/validation';

import EmailConfirmation from '@module/user/emailConfirm/EmailConfirm.Entity';
import { sendConfirmationEmail } from '@module/user/emailConfirm/EmailConfirm.Utils';
import User from '@module/user/User.Entity';
import { hashPassword } from '@module/user/auth/Auth.Utils';

import RegisterInput from './Register.Input';
import { userExists } from '../../utils/userExists';

UserValidator.init(userExists);

@Resolver()
export default class RegisterResolver {
  @Mutation(() => Boolean)
  async register(
    @Arg('user')
    { email, firstName, lastName, username, password }: RegisterInput
  ): Promise<boolean> {
    try {
      await UserValidator.schema.validate({ email, username, password });
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
    } catch {
      return false;
    }

    return true;
  }
}
