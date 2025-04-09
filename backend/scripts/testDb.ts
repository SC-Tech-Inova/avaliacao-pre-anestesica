import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'avaliacao_pre_anestesica',
  password: '071055',
  port: 5432
});

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log('Successfully connected to PostgreSQL');
    
    const result = await client.query('SELECT NOW()');
    console.log('Database time:', result.rows[0].now);
    
    client.release();
    await pool.end();
  } catch (err) {
    console.error('Connection error:', err);
  }
}

testConnection();
