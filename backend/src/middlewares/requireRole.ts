import { Request, Response, NextFunction } from 'express';

export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = req.session.user;

    if (!user || !roles.includes(user.role)) {
      res.status(403).json({ success: false, message: 'Forbidden: Insufficient role' });
      return;
    }

    next();
  };
};