const { pool } = require('../config/database');
const logger = require('../config/logger');

const testDatabaseConnection = async () => {
  try {
    const client = await pool.connect();
    logger.info('Database connection test successful');
    await client.query('SELECT 1'); // Simple query to test connection
    client.release();
    console.log('Database connection is working.');
  } catch (error) {
    logger.error('Database connection test failed:', error);
    console.error('Database connection failed:', error);
  }
};

testDatabaseConnection();

