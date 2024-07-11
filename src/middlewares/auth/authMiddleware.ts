import { FastifyRequest, FastifyReply } from 'fastify';
import { verifyToken } from '../../utils/jwt';
import { UserInfo } from '../../controllers/auth.controller';

interface AuthenticatedRequest extends FastifyRequest {
  user?: UserInfo;
}

export function authMiddleware(req: AuthenticatedRequest, reply: FastifyReply, done: (err?: Error) => void) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    reply.status(401).send({ error: 'Authorization header missing' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const user = verifyToken(token);
    req.user = user;
    done();
  } catch (err) {
    reply.status(401).send({ error: 'Invalid or expired token' });
  }
}