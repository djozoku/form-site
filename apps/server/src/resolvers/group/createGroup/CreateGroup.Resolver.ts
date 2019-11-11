import { Authorized, Mutation, Resolver, Arg, Ctx } from 'type-graphql';
import { getManager } from 'typeorm';

import Group from '@entities/Group';
import User from '@entities/User';

import { MyContext } from '~/types/MyContext';

@Resolver()
export default class CreateGroupResolver {
  @Authorized()
  @Mutation(() => Group, { nullable: true })
  async createGroup(@Arg('name') name: string, @Ctx() { userId }: MyContext) {
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
