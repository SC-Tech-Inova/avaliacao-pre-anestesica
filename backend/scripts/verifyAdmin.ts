import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import * as bcrypt from 'bcrypt';

dotenv.config({ path: resolve(__dirname, '../.env') });

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

async function verifyAdminUser() {
  const client = await pool.connect();
  try {
    const result = await client.query(
      'SELECT username, password_hash, role FROM users WHERE username = $1',
      ['admin']
    );

    if (result.rows.length === 0) {
      console.error('Admin user not found!');
      return;
    }

    const admin = result.rows[0];
    console.log('Admin user exists with role:', admin.role);
    
    // Test password verification
    const testPass = 'admin123';
    const isValid = await bcrypt.compare(testPass, admin.password_hash);
    console.log('Password verification:', isValid ? 'SUCCESS' : 'FAILED');

  } catch (error) {
    console.error('Error verifying admin user:', error);
  } finally {
    await client.release();
    await pool.end();
  }
}

verifyAdminUser();
