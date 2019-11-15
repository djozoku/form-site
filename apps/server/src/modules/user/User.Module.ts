import UserEntity from './User.Entity';
import MeResolver from './Me.Resolver';
import AuthModule from './auth/Auth.Module';
import EmailConfirmModule from './emailConfirm/EmailConfirm.Module';

const UserModule = {
  Entity: UserEntity,
  Resolvers: [MeResolver, ...AuthModule.Resolvers, ...EmailConfirmModule.Resolvers]
};

export default UserModule;
