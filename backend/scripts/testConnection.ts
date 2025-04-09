import { Pool } from 'pg';

const testConnection = async () => {
  const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres', // Primeiro tente conectar ao banco padrão
    password: '071055',
    port: 5432
  });

  try {
    const client = await pool.connect();
    console.log('Connected successfully to PostgreSQL');
    client.release();
    await pool.end();
  } catch (err) {
    console.error('Connection error:', err);
  }
};

testConnection();
