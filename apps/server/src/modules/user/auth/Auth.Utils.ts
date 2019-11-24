import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthChecker } from 'type-graphql';
import { Request, Response } from 'express';

import User from '@module/user/User.Entity';

import { GraphQLContext } from '~/types/GraphQLContext';

interface JWTPayload {
  userId: number;
  tokenVersion?: number;
}

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 12);
};

export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const createAccessToken = (userId: number) => {
  return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: '15m'
  });
};

export const createRefreshToken = (userId: number, tokenVersion: number) => {
  return jwt.sign({ userId, tokenVersion }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: '7d'
  });
};

export const checkAuth: AuthChecker<GraphQLContext> = ({ context } /* , roles */) => {
  const authorization = context.req.headers.authorization;
  if (!authorization) {
    throw new Error('Not Authenticated');
  }
  try {
    const token = authorization.split(' ')[1];
    const { userId } = jwt.verify(token, process.env.JWT_ACCESS_SECRET!) as JWTPayload;
    // eslint-disable-next-line no-param-reassign
    context.userId = userId;
    return true;
  } catch {
    throw new Error('Not Authenticated');
  }
};

export const sendRefreshToken = (res: Response, token: string) => {
  res.cookie('xid', token, { httpOnly: true });
};

export const refreshToken = (req: Request, res: Response) => {
  const denyRefresh = () => {
    res.json({ ok: false, accessToken: '' });
  };
  const token = req.cookies.xid;
  if (!token) {
    denyRefresh();
    return;
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as JWTPayload;
    User.findOne(payload.userId).then((user) => {
      if (!user || user.tokenVersion !== payload.tokenVersion) {
        denyRefresh();
        return;
      }

      sendRefreshToken(res, createRefreshToken(user.id, user.tokenVersion));
      res.json({ ok: true, accessToken: createAccessToken(user.id) });
    });
  } catch {
    denyRefresh();
  }
};
