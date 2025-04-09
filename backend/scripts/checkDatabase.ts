import { pool, testConnection } from '../../removidos/database';
import logger from '../src/config/logger';
import { Pool } from 'pg';

async function checkAndCreateDatabase() {
  try {
    // Try to connect
    await testConnection();
    logger.info('Database connection successful');
  } catch (error) {
    logger.error('Initial connection failed, trying to create database...');
    
    // Connect to postgres default db to create our db
    const pgPool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'postgres',
      password: '071055',
      port: 5432
    });

    try {
      await pgPool.query('CREATE DATABASE avaliacao_pre_anestesica');
      logger.info('Database created successfully');
    } catch (createError) {
      logger.error('Error creating database:', createError);
    } finally {
      await pgPool.end();
    }
  }
}

checkAndCreateDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    logger.error('Script failed:', error);
    process.exit(1);
  });
