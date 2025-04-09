import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '../.env') });

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

async function resetAdminPassword() {
  const client = await pool.connect();
  try {
    const password = 'admin123';
    const hashedPassword = await bcrypt.hash(password, 12);
    
    await client.query(
      'UPDATE users SET password_hash = $1 WHERE username = $2',
      [hashedPassword, 'admin']
    );
    
    console.log('Admin password reset successfully');
    console.log('New password: admin123');
    
    // Verify the password
    const result = await client.query(
      'SELECT password_hash FROM users WHERE username = $1',
      ['admin']
    );
    
    if (result.rows.length > 0) {
      const isValid = await bcrypt.compare(password, result.rows[0].password_hash);
      console.log('Password verification:', isValid ? 'SUCCESS' : 'FAILED');
    }
  } catch (error) {
    console.error('Error resetting admin password:', error);
    throw error;
  } finally {
    await client.release();
    await pool.end();
  }
}

resetAdminPassword()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
