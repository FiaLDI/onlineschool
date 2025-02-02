const pool = require('../config/db');

class User {
  static async create(username, password, email, role) {
    const result = await pool.query(
      'INSERT INTO users (username, password, email, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, password, email, role]
    );
    return result.rows[0];
  }

  static async findByUsername(username) {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }
}

module.exports = User;
