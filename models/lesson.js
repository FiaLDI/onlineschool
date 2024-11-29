const pool = require('../config/db');

class Lesson {
  static async create(courseId, title, content) {
    const result = await pool.query(
      'INSERT INTO lessons (course_id, title, content) VALUES ($1, $2, $3) RETURNING *',
      [courseId, title, content]
    );
    return result.rows[0];
  }

  static async getByCourseId(courseId) {
    const result = await pool.query('SELECT * FROM lessons WHERE course_id = $1', [courseId]);
    return result.rows;
  }
}

module.exports = Lesson;
