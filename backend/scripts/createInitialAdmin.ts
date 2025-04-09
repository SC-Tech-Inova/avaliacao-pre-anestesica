import * as bcrypt from 'bcrypt';
import { pool } from '../../removidos/database';
import logger from '../src/config/logger';

async function createInitialAdmin() {
  try {
    // Verifica se já existe um admin
    const adminExists = await pool.query(
      "SELECT * FROM users WHERE role = 'admin' LIMIT 1"
    );

    if (adminExists.rows.length > 0) {
      logger.info('Admin user already exists');
      return;
    }

    // Cria o hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    // Insere o usuário admin
    await pool.query(
      `INSERT INTO users (username, password, name, role) 
       VALUES ($1, $2, $3, $4)`,
      ['admin', hashedPassword, 'Administrador', 'admin']
    );

    logger.info('Initial admin user created successfully');
  } catch (error) {
    logger.error('Error creating initial admin:', error);
    throw error;
  }
}

createInitialAdmin()
  .then(() => process.exit(0))
  .catch((error) => {
    logger.error('Script failed:', error);
    process.exit(1);
  });