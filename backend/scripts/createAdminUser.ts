import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Carrega as variáveis de ambiente do arquivo correto
dotenv.config({ path: resolve(__dirname, '../../.env') });

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

async function createAdminUser() {
  const client = await pool.connect();
  try {
    console.log('Starting admin user creation...');
    console.log('Database connection successful');

    // First ensure the users table exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(200),
        role VARCHAR(50),
        crm VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const password = 'admin123';
    const hashedPassword = await bcrypt.hash(password, 12);
    
    await client.query(
      `INSERT INTO users (username, password_hash, name, role)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (username) DO UPDATE 
       SET password_hash = EXCLUDED.password_hash`,
      ['admin', hashedPassword, 'Administrador', 'admin']
    );
    
    console.log('Admin user created successfully');
    console.log('Username: admin');
    console.log('Password: admin123');
  } catch (error) {
    console.error('Error creating admin user:', error);
    throw error;
  } finally {
    await client.release();
    await pool.end();
  }
}

createAdminUser()
  .then(() => {
    console.log('Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  });
