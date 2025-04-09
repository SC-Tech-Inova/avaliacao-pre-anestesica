import { Pool } from 'pg';
import * as fs from 'fs';
import * as path from 'path';
import logger from '../src/config/logger';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables from the root .env file
dotenv.config({ path: resolve(__dirname, '../.env') });

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

async function initializeMigrations() {
  const client = await pool.connect();
  try {
    // Drop existing migrations table to start fresh
    await client.query('DROP TABLE IF EXISTS migrations CASCADE');
    
    // Create migrations table
    await client.query(`
      CREATE TABLE migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    logger.info('Migrations table created successfully');
  } catch (error) {
    logger.error('Failed to initialize migrations table:', error);
    throw error;
  } finally {
    client.release();
  }
}

async function runMigrations() {
  const client = await pool.connect();
  try {
    // Initialize migrations table
    await initializeMigrations();

    const migrationsDir = path.join(__dirname, '../src/migrations');
    if (!fs.existsSync(migrationsDir)) {
      fs.mkdirSync(migrationsDir, { recursive: true });
      logger.info(`Created migrations directory at ${migrationsDir}`);
    }

    const files = fs.readdirSync(migrationsDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    if (files.length === 0) {
      logger.warn('No migration files found');
      return;
    }

    for (const file of files) {
      const migrationName = path.parse(file).name;
      await client.query('BEGIN');
      
      try {
        const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
        await client.query(sql);
        
        await client.query(
          'INSERT INTO migrations (name) VALUES ($1)',
          [migrationName]
        );
        
        await client.query('COMMIT');
        logger.info(`Migration ${file} executed successfully`);
      } catch (error) {
        await client.query('ROLLBACK');
        logger.error(`Error executing migration ${file}:`, error);
        throw error;
      }
    }
  } finally {
    client.release();
    await pool.end();
  }
}

// Execute migrations
runMigrations()
  .then(() => {
    logger.info('All migrations executed successfully');
    process.exit(0);
  })
  .catch((error) => {
    logger.error('Migration script failed:', error);
    process.exit(1);
  });
