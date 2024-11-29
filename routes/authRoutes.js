const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.post('/register', register);
router.post('/login', login);

module.exports = router;
