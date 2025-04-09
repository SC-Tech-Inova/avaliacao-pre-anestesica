import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import logger from './config/logger';
import routes from './routes'; // Importar rotas principais
import { errorHandler } from './middlewares/errorHandler'; // Middleware de tratamento de erros

// Carregar variáveis de ambiente
dotenv.config();

const app = express();

// Configuração do CORS
app.use(cors({
  origin: 'http://localhost:3000', // Frontend
  credentials: true, // Cookies e autenticação
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Permitir cabeçalhos
}));

// Middleware para interpretar JSON
app.use(express.json());

// Configuração de sessões
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret', // Alterar em produção
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 horas
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  }
}));

// Montar as rotas principais
app.use('/api', routes);

// Middleware para tratamento de erros
app.use(errorHandler);

export default app;
