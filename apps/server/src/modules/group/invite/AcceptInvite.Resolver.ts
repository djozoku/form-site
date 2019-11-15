import { Mutation, Arg, Ctx, Resolver } from 'type-graphql';
import { getManager } from 'typeorm';

import User from '@module/user/User.Entity';
import Group from '@module/group/Group.Entity';

import { GraphQLContext } from '~/types/GraphQLContext';

import Invite from './Invite.Entity';

@Resolver()
export default class AcceptInviteResolver {
  @Mutation(() => Boolean)
  async acceptInvite(@Arg('group') groupName: string, @Ctx() { userId }: GraphQLContext) {
    const user = await User.findOne(userId, { relations: ['groups'] });
    const group = await Group.findOne({ where: { name: groupName }, relations: ['members'] });
    const invite = await Invite.findOne({ where: { group: { name: groupName } } });

    if (!group || !user || !invite) return false;

    group.members!.push(user);
    getManager().save(group);

    user.groups!.push(group);
    getManager().save(user);

    invite.remove();

    return true;
  }
}
