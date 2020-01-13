import { Resolver, Arg, Mutation } from 'type-graphql';

import User from '@module/user/User.Entity';

import EmailConfirmation from './EmailConfirm.Entity';

@Resolver()
export default class ConfirmEmailResolver {
  @Mutation(() => Boolean, {
    description: 'Confirm an email with a token associated with that account'
  })
  async confirmEmail(@Arg('token', { description: 'Token' }) token: string) {
    const confirmation = await EmailConfirmation.findOne(token);

    if (!confirmation) {
      return false;
    }

    if (Date.now() > confirmation.expiration) {
      return false;
    }

    const user = await User.findOne(confirmation.user);

    if (!user) {
      return false;
    }

    user.confirmed = true;
    user.save();
    confirmation.remove();

    return true;
  }
}
