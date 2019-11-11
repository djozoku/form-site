import InviteToGroup from './inviteToGroup/InviteToGroup.Resolver';
import CreateGroup from './createGroup/CreateGroup.Resolver';
import AcceptInvite from './acceptInvite/AcceptInvite.Resolver';

const GroupResolvers = [InviteToGroup, CreateGroup, AcceptInvite];

export default GroupResolvers;
