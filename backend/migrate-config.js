const path = require('path');
require('dotenv').config();

module.exports = {
  migrations: {
    directory: path.join(__dirname, 'src', 'migrations'),
    tableName: 'pgmigrations'
  },
  databaseUrl: process.env.DATABASE_URL || `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  direction: 'up',
  schema: 'public',
  noLock: true,
  singleTransaction: true,
  verbose: true,
  ignorePattern: '^\\..*',
  // For SQL files:
  file: true,  // Add this if using .sql files
  // For JavaScript migrations:
  // fileExtension: '.js'  // Use this if using JS migrations
};