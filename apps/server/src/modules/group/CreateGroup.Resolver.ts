import { Authorized, Mutation, Resolver, Arg, Ctx, Int } from 'type-graphql';
import { getManager } from 'typeorm';

import User from '@module/user/User.Entity';

import { GraphQLContext } from '~/types/GraphQLContext';

import Group from './Group.Entity';

@Resolver()
export default class CreateGroupResolver {
  @Authorized()
  @Mutation(() => Int, { description: 'Create a group, Auth required' })
  async createGroup(
    @Arg('name', { description: 'Group Name' }) name: string,
    @Ctx() { userId }: GraphQLContext
  ) {
    if (name.length > 100) return 0;
    const user = (await User.findOne(userId, { relations: ['ownedGroups'] })) as User;
    if (await Group.findOne({ where: { name } })) {
      return 0;
    }
    const group = new Group();
    group.name = name;
    group.owner = user;
    const id = (await getManager().save(group)).id;
    user.ownedGroups!.push(group);
    await getManager().save(user);
    return id;
  }
}
