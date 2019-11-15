import { Authorized, Mutation, Resolver, Arg, Ctx } from 'type-graphql';
import { getManager } from 'typeorm';

import User from '@module/user/User.Entity';

import { GraphQLContext } from '~/types/GraphQLContext';

import Group from './Group.Entity';

@Resolver()
export default class CreateGroupResolver {
  @Authorized()
  @Mutation(() => Boolean, { nullable: true })
  async createGroup(@Arg('name') name: string, @Ctx() { userId }: GraphQLContext) {
    const user = await User.findOne(userId);
    if (await Group.findOne({ where: { name } })) {
      return false;
    }
    const group = new Group();
    group.name = name;
    group.owner = user!;
    await getManager().save(group);
    return true;
  }
}
