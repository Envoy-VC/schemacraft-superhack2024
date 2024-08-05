import { cookies } from 'next/headers';

import type { ISuccessResult } from '@worldcoin/idkit';
import { type SessionOptions, getIronSession } from 'iron-session';
import { env } from '~/env';

export interface SessionData extends ISuccessResult {
  expires: string;
}

const sessionOptions: SessionOptions = {
  password: env.IRON_SESSION_PASSWORD,
  cookieName: 'worldcoin-session',
  cookieOptions: {
    secure: false,
  },
};

export const login = async (data: ISuccessResult) => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  session.merkle_root = data.merkle_root;
  session.nullifier_hash = data.nullifier_hash;
  session.proof = data.proof;
  session.verification_level = data.verification_level;
  session.expires = new Date().toISOString();
  await session.save();
  return { success: true };
};

export const logout = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  session.destroy();
  return {
    success: true,
  };
};

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  return session;
};
