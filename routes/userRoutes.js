const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Страница профиля
router.get('/profile', async (req, res) => {
  const user = await User.findById(1); // Здесь нужно брать ID из сессии или JWT токена
  res.render('profile', { title: 'Profile', username: user.username, email: user.email });
});

module.exports = router;
