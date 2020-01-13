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
  @Mutation(() => String, {
    description: 'Register a user, will send a confirmation email to the specified email'
  })
  async register(
    @Arg('user')
    { email, firstName, lastName, username, password }: RegisterInput
  ): Promise<string> {
    let emailUrl = '';
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

      emailUrl =
        (await sendConfirmationEmail(
          email,
          `http://djozokups.ddns.net:44444/account/confirm?id=${id}`
        )) || '';

      await EmailConfirmation.create({
        id,
        user: user.id,
        expiration: Date.now() + 24 * 60 * 60 * 1000
      }).save();
    } catch {
      return '';
    }

    return emailUrl;
  }
}
