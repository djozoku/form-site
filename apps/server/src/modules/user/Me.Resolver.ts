import { Query, Resolver, Ctx, Authorized } from 'type-graphql';

import { GraphQLContext } from '~/types/GraphQLContext';

import User from './User.Entity';

@Resolver()
export default class MeResolver {
  @Authorized()
  @Query(() => User, { nullable: true })
  async me(@Ctx() { userId }: GraphQLContext) {
    return User.findOne(userId!, { relations: ['ownedGroups', 'groups'] });
  }
}
