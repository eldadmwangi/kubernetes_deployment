const seedUsers = async () => {
  const client = await getClient();
  
  try {
    // Verify user_role type exists
    const typeCheck = await client.query(`
      SELECT EXISTS (
        SELECT 1 FROM pg_type WHERE typname = 'user_role'
      )
    `);
    
    if (!typeCheck.rows[0].exists) {
      throw new Error('user_role type does not exist. Run migrations first.');
    }

    const users = [
      {
        username: 'admin',
        email: 'admin@example.com',
        password: await bcrypt.hash('admin123', 10),
        phone: '1234567890',
        roles: ['admin', 'user'] // Must match enum values exactly
      },
      {
        username: 'user1',
        email: 'user1@example.com',
        password: await bcrypt.hash('user1123', 10),
        phone: '0987654321',
        roles: ['user']
      }
    ];

    await client.query('BEGIN');

    for (const user of users) {
      await client.query(
        `INSERT INTO users (username, email, password, phone, roles) 
         VALUES ($1, $2, $3, $4, $5::user_role[]) 
         ON CONFLICT (email) DO NOTHING`,
        [user.username, user.email, user.password, user.phone, user.roles]
      );
    }

    // Update existing users with proper type casting
    await client.query(`
      UPDATE users 
      SET roles = ARRAY['user'::user_role] 
      WHERE roles IS NULL OR roles = '{}'
    `);

    await client.query('COMMIT');
    
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Seeding failed:', error);
    throw error;
  } finally {
    client.release();
  }
};