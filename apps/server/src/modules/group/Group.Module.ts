import GroupEntity from './Group.Entity';
import CreateGroupResolver from './CreateGroup.Resolver';
import InviteModule from './invite/Invite.Module';

const GroupModule = {
  Entity: GroupEntity,
  Resolvers: [CreateGroupResolver, ...InviteModule.Resolvers]
};

export default GroupModule;
