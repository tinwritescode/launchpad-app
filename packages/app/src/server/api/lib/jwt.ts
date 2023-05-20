import { SessionType, sessionSchema } from 'shared';
import jwt from 'jsonwebtoken';
import { env } from '../../../env.mjs';

export const createToken = (payload: SessionType) => {
  return jwt.sign(payload, env.SESSION_SECRET, {
    expiresIn: '15d',
  });
};

export const verifyToken = async (token: string) => {
  const parsed = jwt.verify(token, env.SESSION_SECRET);

  if (!parsed) {
    throw new Error('Invalid token');
  }

  const session = sessionSchema.parse(parsed);

  return session;
};
