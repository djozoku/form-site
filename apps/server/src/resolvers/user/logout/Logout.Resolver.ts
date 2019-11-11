import { Resolver, Mutation, Ctx, Authorized } from 'type-graphql';

import { MyContext } from '~/types/MyContext';

@Resolver()
export default class LogoutResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext): Promise<boolean> {
    res.clearCookie('xid');
    return true;
  }
}
