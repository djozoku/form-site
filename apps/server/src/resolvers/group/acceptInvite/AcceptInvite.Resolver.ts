import { Mutation, Arg, Ctx, Resolver } from 'type-graphql';
import { getManager } from 'typeorm';

import User from '@entities/User';
import Group from '@entities/Group';
import Invite from '@entities/Invite';

import { MyContext } from '~/types/MyContext';

@Resolver()
export default class AcceptInviteResolver {
  @Mutation(() => Boolean)
  async acceptInvite(@Arg('group') groupName: string, @Ctx() { userId }: MyContext) {
    const user = await User.findOne(userId);
    const group = await Group.findOne({ where: { name: groupName } });
    const invite = await Invite.findOne({ where: { group: { name: groupName } } });

    if (!group) return false;
    if (!user) return false;
    if (!invite) return false;

    group.members.push(user);
    getManager().save(group);

    user.groups.push(group);
    getManager().save(user);

    invite.remove();

    return true;
  }
}
