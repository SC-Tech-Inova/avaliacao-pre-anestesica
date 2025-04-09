import { Request, Response, NextFunction } from 'express';

export default function validateLoginInput(
  req: Request,
  res: Response, 
  next: NextFunction
) {
  const { username, password } = req.body;

  if (!username || typeof username !== 'string' || username.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'Username é obrigatório'
    });
  }

  if (!password || typeof password !== 'string' || password.trim() === '') {
    return res.status(400).json({
      success: false,
      error: 'Senha é obrigatória'
    });
  }

  // Sanitize input
  req.body.username = username.trim().toLowerCase();
  req.body.password = password.trim();

  next();
}
