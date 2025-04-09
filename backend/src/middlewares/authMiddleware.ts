import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

// Estender a interface SessionData para incluir a propriedade user
declare module 'express-session' {
  interface SessionData {
    user?: {
      id: string;
      username: string;
      role: 'admin' | 'anesthesiologist';
    };
  }
}

// Estender a interface Request do Express para incluir userId e userRole
declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userRole?: 'admin' | 'anesthesiologist';
    }
  }
}

// Middleware de autenticação baseado em sessão
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.session.user) {
    logger.warn(`Acesso não autorizado na rota ${req.originalUrl}`);
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return;
  }

  // Definir userId e userRole no objeto req para uso em outros middlewares
  req.userId = req.session.user.id;
  req.userRole = req.session.user.role;

  next();
};

// Middleware para verificar se o usuário tem a role necessária
export const requireRole = (roles: ('admin' | 'anesthesiologist')[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.userRole || !roles.includes(req.userRole)) {
      logger.warn(`Usuário ${req.userId} tentou acessar um recurso não autorizado na rota ${req.originalUrl}`);
      res.status(403).json({ success: false, message: 'Permissões insuficientes' });
      return;
    }
    next();
  };
};
