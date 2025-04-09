const db = require('../config/db');

module.exports = {
  getAllUsers: async () => {
    try {
      const { rows } = await db.query("SELECT * FROM users ORDER BY ID ASC");
      return rows;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  getUserById: async (id) => {
    try {
      const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);
      return rows[0];
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  },

  createUser: async (userData) => {
    const { username, phone, email, password, created_at, updated_at } = userData;
    try {
      const { rows } = await db.query(
        "INSERT INTO users (username, phone, email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [username, phone, email, password, created_at, updated_at]
      );
      return rows[0];
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  updateUser: async (id, userData) => {
    const { username, phone, email } = userData;
    try {
      const { rows } = await db.query(
        "UPDATE users SET username = $1, phone = $2, email = $3 WHERE id = $4 RETURNING *",
        [username, phone, email, id]
      );
      return rows[0];
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      const { rows } = await db.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
      return rows[0];
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },

  getUserByEmail: async (email) => {
    try {
      const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [email]);
      return rows[0];
    } catch (error) {
      console.error("Error fetching user by email:", error);
      throw error;
    }
  },
};