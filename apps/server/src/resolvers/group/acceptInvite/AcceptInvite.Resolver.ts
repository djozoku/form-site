import { Mutation, Arg, Ctx, Resolver } from 'type-graphql';
import { getManager } from 'typeorm';

import User from '@entities/User';
import Group from '@entities/Group';
import Invite from '@entities/Invite';

import { GraphQLContext } from '~/types/GraphQLContext';

@Resolver()
export default class AcceptInviteResolver {
  @Mutation(() => Boolean)
  async acceptInvite(@Arg('group') groupName: string, @Ctx() { userId }: GraphQLContext) {
    const user = await User.findOne(userId, { relations: ['groups'] });
    const group = await Group.findOne({ where: { name: groupName }, relations: ['members'] });
    const invite = await Invite.findOne({ where: { group: { name: groupName } } });

    if (!group) return false;
    if (!user) return false;
    if (!invite) return false;

    group.members!.push(user);
    getManager().save(group);

    user.groups!.push(group);
    getManager().save(user);

    invite.remove();

    return true;
  }
}
