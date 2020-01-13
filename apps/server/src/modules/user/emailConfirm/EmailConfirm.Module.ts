import EmailConfirmEntity from './EmailConfirm.Entity';
import ConfirmEmailResolver from './ConfirmEmail.Resolver';
import * as EmailConfirmUtils from './EmailConfirm.Utils';

const EmailConfirmModule = {
  Entity: EmailConfirmEntity,
  Resolvers: [ConfirmEmailResolver],
  Utils: EmailConfirmUtils
};

export default EmailConfirmModule;
