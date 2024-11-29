const express = require('express');
const Course = require('../models/course');
const router = express.Router();

// Страница курсов
router.get('/', async (req, res) => {
  const courses = await Course.getAll();
  res.render('courses', { title: 'Courses', courses });
});

module.exports = router;
