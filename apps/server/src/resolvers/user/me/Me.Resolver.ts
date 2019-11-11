import { Query, Resolver, Ctx, Authorized } from 'type-graphql';

import User from '@entities/User';

import { MyContext } from '~/types/MyContext';

@Resolver()
export default class MeResolver {
  @Authorized()
  @Query(() => User, { nullable: true })
  async me(@Ctx() { userId }: MyContext) {
    return User.findOne(userId!);
  }
}
