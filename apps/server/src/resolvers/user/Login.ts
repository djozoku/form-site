import { Resolver, Arg, Mutation } from 'type-graphql';

import User from '../../entity/User';
import { comparePassword, createAccessToken, createRefreshToken } from '../../utils/auth';
import LoginInput from './inputs/LoginInput';
import LoginResponse from './responses/LoginResponse';

@Resolver()
export default class LoginResolver {
  @Mutation(() => LoginResponse, { nullable: true })
  async login(@Arg('user') { username, password }: LoginInput): Promise<LoginResponse> {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw new Error('Bad username or password');
    }

    if (await !comparePassword(password, user.username!)) {
      throw new Error('Bad username or password');
    }

    res.cookie('xid', createRefreshToken(user.id), { httpOnly: true });

    return {
      accessToken: createAccessToken(user.id)
    };
  }
}
