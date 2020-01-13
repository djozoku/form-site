import { Resolver, Authorized, Mutation, Arg } from 'type-graphql';
import { getManager } from 'typeorm';

import User from '@module/user/User.Entity';
import Group from '@module/group/Group.Entity';

import Invite from './Invite.Entity';

@Resolver()
export default class InviteToGroupResolver {
  @Authorized()
  @Mutation(() => Boolean, { description: 'Invite a user to an owned group, Auth required' })
  async inviteToGroup(
    @Arg('group', { description: 'Name of the group to invite the user to' }) groupName: string,
    @Arg('username', { description: 'Username of the user to invite' }) username: string
  ) {
    // FIXME: we don't check if user is already in the group
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
