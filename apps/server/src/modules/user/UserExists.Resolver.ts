import { Query, Resolver, Arg } from 'type-graphql';

import { userExists } from './utils/userExists';

@Resolver()
export default class UserExistsResolver {
  @Query(() => Boolean, { description: 'Check if a user exists' })
  async userExists(
    @Arg('type', { description: 'Allowed values: email, username' }) type: string,
    @Arg('value', { description: 'Search string' }) value: string
  ) {
    return userExists(type, value);
  }
}
