import { Resolver, Arg, Mutation, Ctx } from 'type-graphql';

import User from '../../../entity/User';
import {
  comparePassword,
  createAccessToken,
  createRefreshToken,
  sendRefreshToken
} from '../../../utils/auth';
import LoginInput from './Login.Input';
import LoginResponse from './Login.Response';
import { MyContext } from '../../../types/MyContext';

@Resolver()
export default class LoginResolver {
  @Mutation(() => LoginResponse, { nullable: true })
  async login(
    @Arg('user') { username, password }: LoginInput,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw new Error('Bad username or password');
    }

    if (await !comparePassword(password, user.username!)) {
      throw new Error('Bad username or password');
    }

    if (!user.confirmed) {
      throw new Error('Email is not confirmed');
    }

    sendRefreshToken(res, createRefreshToken(user.id, user.tokenVersion));

    return {
      accessToken: createAccessToken(user.id)
    };
  }
}
