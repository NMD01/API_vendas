import auth from '@config/auth';
import AppErrors from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppErrors('jwt token is missing');
  }

  const [type, token] = authHeader.split(' ');

  try {
    const decodeToken = verify(token, auth.jwt.secret);

    const { sub } = decodeToken as ITokenPayload;
    request.user = {
      id: sub
    }


    next();
  } catch {
    throw new AppErrors('Invalid JWT token');
  }
}
