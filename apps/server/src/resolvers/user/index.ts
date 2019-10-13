import RegisterResolver from './register/Register.Resolver';
import LoginResolver from './login/Login.Resolver';
import MeResolver from './me/Me.Resolver';
import ConfirmEmailResolver from './confirmEmail/ConfirmEmail.Resolver';
import LogoutResolver from './logout/Logout.Resolver';

const UserResolvers = [
  RegisterResolver,
  LoginResolver,
  MeResolver,
  ConfirmEmailResolver,
  LogoutResolver
];

export default UserResolvers;
