import RegisterResolver from './Register';
import LoginResolver from './Login';
import MeResolver from './Me';
import ConfirmEmailResolver from './ConfirmEmail';
import LogoutResolver from './Logout';

const UserResolvers = [
  RegisterResolver,
  LoginResolver,
  MeResolver,
  ConfirmEmailResolver,
  LogoutResolver
];

export default UserResolvers;
