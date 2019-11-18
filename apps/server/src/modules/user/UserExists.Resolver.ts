import { Query, Resolver, Arg } from 'type-graphql';

import { userExists } from './utils/userExists';

@Resolver()
export default class UserExistsResolver {
  @Query(() => Boolean)
  async userExists(@Arg('type') type: string, @Arg('value') value: string) {
    return userExists(type, value);
  }
}
