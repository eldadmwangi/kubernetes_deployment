exports.up = (pgm) => {
  // 1. First create the enum type
  pgm.createType('user_role', ['admin', 'user', 'editor']);
  
  // 2. Add the column without default or NOT NULL initially
  pgm.addColumn('users', {
    roles: {
      type: 'user_role[]'
    }
  });
  
  // 3. Set default value for new rows using proper array constructor
  pgm.sql(`
    ALTER TABLE users 
    ALTER COLUMN roles 
    SET DEFAULT ARRAY['user'::user_role]
  `);
  
  // 4. Update existing records
  pgm.sql(`
    UPDATE users 
    SET roles = ARRAY['user'::user_role]
    WHERE roles IS NULL
  `);
  
  // 5. Add NOT NULL constraint
  pgm.alterColumn('users', 'roles', {
    notNull: true
  });
};

exports.down = (pgm) => {
  // 1. Remove NOT NULL constraint
  pgm.alterColumn('users', 'roles', {
    notNull: false
  });
  
  // 2. Remove default value
  pgm.sql(`
    ALTER TABLE users 
    ALTER COLUMN roles 
    DROP DEFAULT
  `);
  
  // 3. Drop the column
  pgm.dropColumn('users', 'roles');
  
  // 4. Drop the enum type
  pgm.dropType('user_role');
};