import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'default_secret';

export function generateToken(userId: string, isAnonymous: boolean): string {
  return jwt.sign({ userId, isAnonymous }, secret, { expiresIn: '7d' });
}

export function verifyToken(token: string): { userId: string; isAnonymous: boolean } | null {
  try {
    const decoded = jwt.verify(token, secret) as { userId: string; isAnonymous: boolean };
    return decoded;
  } catch {
    return null;
  }
}