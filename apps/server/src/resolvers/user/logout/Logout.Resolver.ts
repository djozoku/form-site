import { Resolver, Mutation } from 'type-graphql';

@Resolver()
export default class LoginResolver {
  @Mutation(() => Boolean)
  async logout(): Promise<boolean> {
    return true;
  }
}
