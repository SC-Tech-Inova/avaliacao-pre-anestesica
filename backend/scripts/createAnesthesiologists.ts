import { pool } from '../../removidos/database';
import logger from '../src/config/logger';

const anesthesiologists = [
  {
    username: 'bruno.torres',
    password: 'Botelho1',
    name: 'Bruno Torres',
    role: 'anesthesiologist',
    crm: 'CRM-XX 12345'
  },
  {
    username: 'andressa.fonseca',
    password: 'Botelho1',
    name: 'Andressa Fonseca',
    role: 'anesthesiologist',
    crm: 'CRM-XX 67890'
  }
];

async function createAnesthesiologists() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    await client.query('DELETE FROM users');
    logger.info('Deleted existing users');
    
    for (const user of anesthesiologists) {
      const result = await client.query(
        `INSERT INTO users (username, password, name, role, crm) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING id, username, name, role, crm`,
        [user.username, user.password, user.name, user.role, user.crm]
      );
      
      logger.info(`Created user: ${JSON.stringify(result.rows[0])}`);
    }

    await client.query('COMMIT');
    logger.info('All users created successfully');
  } catch (error) {
    await client.query('ROLLBACK');
    logger.error('Error creating users:', error);
    throw error;
  } finally {
    client.release();
  }
}

createAnesthesiologists()
  .then(() => process.exit(0))
  .catch(error => {
    logger.error('Script failed:', error);
    process.exit(1);
  });
