import InviteEntity from './Invite.Entity';
import AcceptInviteResolver from './AcceptInvite.Resolver';
import InviteToGroupResolver from './InviteToGroup.Resolver';

const InviteModule = {
  Entity: InviteEntity,
  Resolvers: [AcceptInviteResolver, InviteToGroupResolver]
};

export default InviteModule;
