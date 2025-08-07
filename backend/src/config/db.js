
const { Pool } = require('pg');

const dbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT) || 5432,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 30000,
  max: 20,
};

const pool = new Pool(dbConfig);

// Immediate connection test with retry logic
const testConnection = async (attempt = 1) => {
  const maxAttempts = 10;
  const retryDelay = 3000;

  try {
    const res = await pool.query('SELECT NOW() as current_time, version() as db_version');
    console.log('✅ Database connected successfully!');
    console.log('📅 Current DB time:', res.rows[0].current_time);
    console.log('ℹ️ PostgreSQL version:', res.rows[0].db_version.split('\n')[0]);

    // Log pool stats periodically
    setInterval(async () => {
      try {
        const stats = await pool.query('SELECT count(*) FROM pg_stat_activity WHERE usename = $1', [dbConfig.user]);
        console.log(`📊 Database stats: ${stats.rows[0].count} active connections`);
      } catch (e) {
        console.error('⚠️ Error collecting DB stats:', e.message);
      }
    }, 30000);

  } catch (err) {
    console.error(`❌ Database connection failed (attempt ${attempt}/${maxAttempts}): ${err.message}`);

    if (attempt < maxAttempts) {
      console.log(`🔁 Retrying in ${retryDelay / 1000} seconds...`);
      setTimeout(() => testConnection(attempt + 1), retryDelay);
    } else {
      console.error('💥 Failed to connect to database after multiple attempts');
      process.exit(1);
    }
  }
};

// Test connection on startup
testConnection();

// Event listeners for better monitoring
pool.on('connect', () => {
  console.log('🔌 New database connection established');
});

pool.on('error', (err) => {
  console.error('⚠️ Unexpected database error:', err);
  // Don't exit here - let the pool handle reconnection
});

process.on('SIGINT', async () => {
  console.log('🔌 Closing database connections...');
  await pool.end();
  process.exit(0);
});

module.exports = {
  query: (text, params) => {
    console.log('📝 Executing query:', text.substring(0, 100) + (text.length > 100 ? '...' : ''));
    return pool.query(text, params);
  },
  getClient: async () => {
    const client = await pool.connect();
    console.log('🆕 Client checked out from pool');
    return client;
  },
  pool, // Export pool directly for special cases
};
