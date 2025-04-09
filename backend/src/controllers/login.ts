import { Request, Response } from 'express';
import pool from '../config/database';
import bcrypt from 'bcrypt';
import logger from '../config/logger';
import Joi from 'joi';
import jwt from 'jsonwebtoken';

interface User {
  id: number;
  username: string;
  role: 'admin' | 'anesthesiologist';
  name: string;
  crm: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

// Esquema de validação para o login
const loginSchema = Joi.object({
  username: Joi.string().required().min(3).max(50),
  password: Joi.string().required().min(6).max(100),
});

// Handler para o login
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    // Valida o corpo da requisição usando Joi
    const { error } = loginSchema.validate(req.body);
    if (error) {
      logger.warn(`Erro de validação: ${error.details[0].message}`);
      res.status(400).json({ success: false, error: 'Dados inválidos.' });
      return;
    }

    const { username, password } = req.body;

    // Conecta-se ao banco de dados para buscar o usuário
    const client = await pool.connect();
    try {
      const result = await client.query(
        'SELECT id, username, password_hash, name, role, crm FROM users WHERE username = $1',
        [username]
      );

      if (result.rows.length === 0) {
        logger.warn(`Usuário não encontrado: ${username}`);
        res.status(401).json({ success: false, error: 'Credenciais inválidas.' });
        return;
      }

      const user = result.rows[0];

      // Verifica se a senha corresponde ao hash armazenado
      if (!user.password_hash || !bcrypt.compareSync(password, user.password_hash)) {
        logger.warn(`Senha inválida para o usuário: ${username}`);
        res.status(401).json({ success: false, error: 'Credenciais inválidas.' });
        return;
      }

      // Verifica se o papel do usuário é permitido
      if (user.role !== 'admin' && user.role !== 'anesthesiologist') {
        logger.warn(`Role inválido para o usuário: ${username}`);
        res.status(401).json({ success: false, error: 'Credenciais inválidas.' });
        return;
      }

      // Gera o token JWT
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Retorna o token e os dados do usuário na resposta
      res.status(200).json({ success: true, token, user });
    } finally {
      client.release();
    }
  } catch (err) {
    logger.error('Erro no login:', err);
    res.status(500).json({ success: false, error: 'Erro interno no servidor.' });
  }
};

export default login;
