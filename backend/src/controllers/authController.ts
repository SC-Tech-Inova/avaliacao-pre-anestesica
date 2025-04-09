import { Request, Response } from 'express';
import authService from '../services/authService'; // Certifique-se de que o caminho está correto

// Função de login para autenticar usuários
export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  // Verificar se os campos username e password estão presentes
  if (!username || !password) {
    res.status(400).json({ success: false, message: 'Username and password are required' });
    return;
  }

  try {
    // Chamar o método validateUser no authService para verificar credenciais
    const user = await authService.validateUser(username, password);

    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
      return;
    }

    // Armazenar o usuário na sessão
    req.session.user = user;

    res.status(200).json({ success: true, user });
  } catch (error) {
    // Tratar erros e responder com mensagem genérica de servidor
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
