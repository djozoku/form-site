import User from '../User.Entity';

export const userExists = async (property: string, value: string) => {
  if (property === 'username') {
    return User.findOne({ where: { username: value } }).then((val) => !!val);
  }
  if (property === 'email') {
    return User.findOne({ where: { email: value } }).then((val) => !!val);
  }
  return false;
};
