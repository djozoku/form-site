import { Resolver, Arg, Mutation } from 'type-graphql';

import User from '@module/user/User.Entity';

import EmailConfirmation from './EmailConfirm.Entity';

@Resolver()
export default class ConfirmEmailResolver {
  @Mutation(() => Boolean)
  async confirmEmail(@Arg('token') token: string) {
    const confirmation = await EmailConfirmation.findOne(token);

    if (!confirmation) {
      return false;
    }
    console.log(confirmation.user);

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
