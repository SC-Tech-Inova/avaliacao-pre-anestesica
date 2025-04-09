import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { API_BASE_URL } from '../config/api';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

interface User {
  id: string;
  username: string;
  role: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
      // Chama o endpoint que verifica as credenciais no backend
      const response = await axios.post<User>('http://localhost:5000/api/verifyUser', { username, password });
      const user: User = response.data;
      
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // Gera o token JWT com os dados do usuário
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        JWT_SECRET,
        { expiresIn: '1h' }
      );

      // Configura o cookie com o token (opcional, para suporte à sessão)
      const cookie = serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600,  // 1 hora
        path: '/',
      });
      res.setHeader('Set-Cookie', cookie);

      // Retorna na resposta o token e os dados do usuário
      return res.status(200).json({ success: true, token, user });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};

export default handler;

interface LoginResponse {
  success: boolean;
  token: string;
  user: User;
  error?: string;
}

export async function loginUser(username: string, password: string): Promise<LoginResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    });

    const data: LoginResponse = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to login');
    }

    // Armazena o token e os dados do usuário no localStorage (para uso no front-end)
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    return data;
  } catch (error: any) {
    console.error('Login error:', error);
    throw error;
  }
}
