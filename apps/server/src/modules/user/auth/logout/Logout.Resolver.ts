import { Resolver, Mutation, Ctx } from 'type-graphql';

import { GraphQLContext } from '~/types/GraphQLContext';

@Resolver()
export default class LogoutResolver {
  @Mutation(() => Boolean, { description: 'Logout a user' })
  async logout(@Ctx() { res }: GraphQLContext): Promise<boolean> {
    res.clearCookie('xid');
    return true;
  }
}
