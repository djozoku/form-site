import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthChecker } from 'type-graphql';
import { Request, Response } from 'express';
import { MyContext } from '../types/MyContext';
import User from '../entity/User';

interface JWTPayload {
  userId: number;
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

export const createRefreshToken = (userId: number) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: '7d'
  });
};

export const checkAuth: AuthChecker<MyContext> = ({ context } /* , roles */) => {
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

export const refreshToken = (req: Request, res: Response) => {
  const token = req.cookies.xid;
  if (!token) {
    res.json({ ok: false, accessToken: '' });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as JWTPayload;
    User.findOne(payload.userId).then((user) => {
      if (!user) res.json({ ok: false, accessToken: '' });
      else res.json({ ok: true, accessToken: createAccessToken(user.id) });
    });
  } catch {
    res.json({ ok: false, accessToken: '' });
  }
};
