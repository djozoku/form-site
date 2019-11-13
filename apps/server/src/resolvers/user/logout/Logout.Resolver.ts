import { Resolver, Mutation, Ctx, Authorized } from 'type-graphql';

import { GraphQLContext } from '~/types/GraphQLContext';

@Resolver()
export default class LogoutResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: GraphQLContext): Promise<boolean> {
    res.clearCookie('xid');
    return true;
  }
}
