const express = require('express');
const { createLesson, getLessonsByCourse } = require('../controllers/lessonController');
const router = express.Router();

router.post('/', createLesson);
router.get('/:courseId', getLessonsByCourse);

module.exports = router;
