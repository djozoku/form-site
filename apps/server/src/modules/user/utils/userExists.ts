import User from '../User.Entity';

export const userExists = async (property: string, value: string) => {
  if (property === 'username') {
    console.log('username');
    return User.findOne({ where: { username: value } }).then((val) => typeof val !== 'undefined');
  }
  if (property === 'email') {
    return User.findOne({ where: { email: value } }).then((val) => typeof val !== 'undefined');
  }
  return false;
};
