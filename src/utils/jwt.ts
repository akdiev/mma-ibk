import * as jwt from 'jsonwebtoken';
import { UserInfo } from '../controllers/auth.controller';

const secretKey = 'your-secret-key'; // Replace with your secret key
const expiresIn = '1h'; // Token expiration time


export function generateToken(payload: UserInfo): string {
  return jwt.sign(payload, secretKey, { expiresIn });
}

export function verifyToken(token: string): UserInfo {
  return jwt.verify(token, secretKey) as UserInfo;
}
