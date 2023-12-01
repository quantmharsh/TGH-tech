// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const JWT_SECRET="HarshIsGoodBoy"

export const authenticateAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!(decoded as { isAdmin: boolean }).isAdmin) {
      return res.status(401).json({ msg: 'Not authorized as an admin' });
    }

    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
