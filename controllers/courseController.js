const Course = require('../models/course');

const getAllCourses = async (req, res) => {
  const courses = await Course.getAll();
  res.json(courses);
};

const createCourse = async (req, res) => {
  const { title, description, teacherId } = req.body;
  const newCourse = await Course.create(title, description, teacherId);
  res.status(201).json(newCourse);
};

module.exports = { getAllCourses, createCourse };
