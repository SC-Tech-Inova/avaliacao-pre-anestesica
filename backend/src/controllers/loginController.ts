import { Request, Response } from 'express';
import pool from '../config/database';
import bcrypt from 'bcrypt';
import logger from '../config/logger';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

// Definir a interface User
interface User {
  id: number;
  username: string;
  role: 'admin' | 'anesthesiologist';
  name: string;
  crm: string;
}

// Esquema de validação para login
const loginSchema = Joi.object({
  username: Joi.string().required().min(3).max(50),
  password: Joi.string().required().min(6).max(100),
});

// Função para verificar o usuário no banco de dados
const verifyUserLocal = async (username: string, password: string): Promise<User | null> => {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT id, username, password_hash, name, role, crm FROM users WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      logger.warn(`Usuário não encontrado: ${username}`);
      return null;
    }

    const user = result.rows[0];

    // Validar a senha
    if (!user.password_hash || !bcrypt.compareSync(password, user.password_hash)) {
      logger.warn(`Senha inválida para o usuário: ${username}`);
      return null;
    }

    if (user.role !== 'admin' && user.role !== 'anesthesiologist') {
      logger.warn(`Role inválido para o usuário: ${username}`);
      return null;
    }

    logger.info(`Usuário autenticado: ${username}`);
    return {
      id: user.id,
      username: user.username,
      role: user.role as 'admin' | 'anesthesiologist',
      name: user.name,
      crm: user.crm,
    };
  } catch (error) {
    logger.error('Erro ao verificar usuário no banco de dados:', error);
    throw error;
  } finally {
    client.release();
  }
};

// Handler para o login
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    logger.info('Iniciando login.');

    const { error } = loginSchema.validate(req.body);
    if (error) {
      logger.warn(`Erro de validação: ${error.details[0].message}`);
      res.status(400).json({ success: false, error: 'Dados inválidos.' });
      return;
    }

    const { username, password } = req.body;
    const user = await verifyUserLocal(username, password);

    if (!user) {
      logger.warn('Credenciais inválidas.');
      res.status(401).json({ success: false, error: 'Credenciais inválidas.' });
      return;
    }

    // Gera o token JWT com os dados do usuário
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Configura o cookie com o token (opcional, para uso em sessões)
    const cookie = serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600, // 1 hora
      path: '/',
    });

    res.setHeader('Set-Cookie', cookie);

    // Salva o usuário na sessão (conversão para string)
    req.session.user = {
      id: user.id.toString(),
      username: user.username,
      role: user.role,
    };

    logger.info('Login realizado com sucesso.');
    // Retorna o token e o usuário na resposta
    res.status(200).json({ success: true, token, user });
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error(`Erro interno: ${error.message}`);
      res.status(500).json({ success: false, error: 'Erro no servidor.' });
    } else {
      logger.error('Erro inesperado.', error);
      res.status(500).json({ success: false, error: 'Erro desconhecido.' });
    }
  }
};

export default login;
