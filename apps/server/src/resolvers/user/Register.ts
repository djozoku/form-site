import { Resolver, Mutation, Arg } from 'type-graphql';
import { hashPassword } from '../../utils/password';
import User from '../../entity/User';
import RegisterInput from './inputs/RegisterInput';

@Resolver()
export default class RegisterResolver {
  @Mutation(() => User)
  async register(@Arg('user')
  {
    email,
    firstName,
    lastName,
    username,
    password
  }: RegisterInput): Promise<User> {
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      email,
      firstName,
      lastName,
      username,
      password: hashedPassword,
      confirmed: false
    }).save();

    return user;
  }
}
