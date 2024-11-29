const Lesson = require('../models/lesson');

const createLesson = async (req, res) => {
  const { courseId, title, content } = req.body;
  const newLesson = await Lesson.create(courseId, title, content);
  res.status(201).json(newLesson);
};

const getLessonsByCourse = async (req, res) => {
  const { courseId } = req.params;
  const lessons = await Lesson.getByCourseId(courseId);
  res.json(lessons);
};

module.exports = { createLesson, getLessonsByCourse };
