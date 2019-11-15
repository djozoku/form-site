import { Resolver, Authorized, Mutation, Arg } from 'type-graphql';
import { getManager } from 'typeorm';

import User from '@module/user/User.Entity';
import Group from '@module/group/Group.Entity';

import Invite from './Invite.Entity';

@Resolver()
export default class InviteToGroupResolver {
  @Authorized()
  @Mutation(() => Boolean)
  async inviteToGroup(@Arg('group') groupName: string, @Arg('username') username: string) {
    const group = await Group.findOne({ where: { name: groupName } });
    const user = await User.findOne({ where: { username } });

    if (!group || !user) {
      return false;
    }

    const invite = new Invite();
    invite.group = group;
    invite.user = user;

    await getManager().save(invite);

    return true;
  }
}
