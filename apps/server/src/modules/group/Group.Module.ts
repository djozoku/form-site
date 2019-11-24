import GroupEntity from './Group.Entity';
import CreateGroupResolver from './CreateGroup.Resolver';
import InviteModule from './invite/Invite.Module';
import GroupResolver from './Group.Resolver';

const GroupModule = {
  Entity: GroupEntity,
  Resolvers: [CreateGroupResolver, GroupResolver, ...InviteModule.Resolvers]
};

export default GroupModule;
