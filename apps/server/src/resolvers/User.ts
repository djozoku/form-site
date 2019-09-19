import { Query, Resolver, Mutation, Arg } from 'type-graphql';
import { comparePassword, hashPassword } from '../utils/password';
import User from '../entity/User';

@Resolver()
export default class UserResolver {
  @Query(() => String)
  hello() {
    return 'This is the user resolver';
  }

  @Mutation(() => User)
  async register(
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('username') username: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<User> {
    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      email,
      firstName,
      lastName,
      username,
      password: hashedPassword
    }).save();

    return user;
  }

  @Mutation(() => User)
  async login(
    @Arg('username') username: string,
    @Arg('password') password: string
  ): Promise<User | {}> {
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        throw new Error('Wrong username or password!');
      }
      if (await comparePassword(password, user!.username!)) {
        return user;
      }
    } catch {
      throw new Error('Wrong username or password!');
    }
    return {};
  }
}
