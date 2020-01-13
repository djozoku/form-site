import { Resolver, Arg, Mutation, Ctx } from 'type-graphql';

import User from '@module/user/User.Entity';
import {
  comparePassword,
  createAccessToken,
  createRefreshToken,
  sendRefreshToken
} from '@module/user/auth/Auth.Utils';

import { GraphQLContext } from '~/types/GraphQLContext';

import LoginInput from './Login.Input';
import LoginResponse from './Login.Response';

@Resolver()
export default class LoginResolver {
  @Mutation(() => LoginResponse, { nullable: true, description: 'Login a user with credentials' })
  async login(
    @Arg('user') { username, password }: LoginInput,
    @Ctx() { res }: GraphQLContext
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
