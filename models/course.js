const pool = require('../config/db');

class Course {
  static async create(title, description, teacherId) {
    const result = await pool.query(
      'INSERT INTO courses (title, description, teacher_id) VALUES ($1, $2, $3) RETURNING *',
      [title, description, teacherId]
    );
    return result.rows[0];
  }

  static async getAll() {
    const result = await pool.query('SELECT * FROM courses');
    return result.rows;
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM courses WHERE id = $1', [id]);
    return result.rows[0];
  }
}

module.exports = Course;
