import LoginResolver from './login/Login.Resolver';
import LogoutResolver from './logout/Logout.Resolver';
import RegisterResolver from './register/Register.Resolver';
import * as AuthUtils from './Auth.Utils';

const AuthModule = {
  Utils: AuthUtils,
  Resolvers: [LoginResolver, LogoutResolver, RegisterResolver]
};

export { AuthUtils };

export default AuthModule;
