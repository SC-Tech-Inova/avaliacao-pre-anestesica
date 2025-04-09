import { Router, Request, Response, NextFunction } from 'express';
import { authMiddleware } from '../../../middlewares/authMiddleware';
import { login } from '../../../controllers/loginController';

const router = Router();

// Rotas públicas
// Endpoint para login de usuários
router.post('/login', login);

// Rotas protegidas
// Endpoint para logout de usuários autenticados
router.post('/logout', authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await localLogout(req);
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Erro durante o logout:', error);
    res.status(500).json({ success: false, message: 'Failed to log out' });
  }
});

export default router;

// Função auxiliar para encerrar a sessão do usuário
export const localLogout = async (req: Request): Promise<void> => {
  return new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) {
        reject(new Error('Failed to destroy session'));
      } else {
        resolve();
      }
    });
  });
};
