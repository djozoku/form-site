import UserEntity from './User.Entity';
import MeResolver from './Me.Resolver';
import AuthModule from './auth/Auth.Module';
import EmailConfirmModule from './emailConfirm/EmailConfirm.Module';
import UserExistsResolver from './UserExists.Resolver';

const UserModule = {
  Entity: UserEntity,
  Resolvers: [
    MeResolver,
    UserExistsResolver,
    ...AuthModule.Resolvers,
    ...EmailConfirmModule.Resolvers
  ]
};

export default UserModule;
