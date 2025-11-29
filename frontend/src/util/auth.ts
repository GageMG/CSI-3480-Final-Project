import { cookies } from 'next/headers';
import { getIronSession, SessionOptions } from 'iron-session';

export interface SessionData { isAuthenticated: boolean }

export const sessionOptions: SessionOptions = {
  // Use this string for encryption.
  password: process.env.IRON_SESSION_SECRET ?? '32_character_secret_32_character_secret',
  // The name of the browser cookie.
  cookieName: '_auth',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 5 * 10000
  }
};

export async function getSession() {
  const cookieStore = await cookies();

  return await getIronSession<SessionData>(cookieStore, sessionOptions);
}
