import { Resolver, /* Arg, */ Mutation } from 'type-graphql';

// import User from '../../entity/User';

@Resolver()
export default class ConfirmEmailResolver {
  @Mutation(() => Boolean)
  async confirmEmail(/* @Arg('token') token: string */) {
    return false;
  }
}
