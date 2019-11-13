import { Query, Resolver, Ctx, Authorized } from 'type-graphql';

import User from '@entities/User';

import { GraphQLContext } from '~/types/GraphQLContext';

@Resolver()
export default class MeResolver {
  @Authorized()
  @Query(() => User, { nullable: true })
  async me(@Ctx() { userId }: GraphQLContext) {
    return User.findOne(userId!, { relations: ['ownedGroups', 'groups'] });
  }
}
