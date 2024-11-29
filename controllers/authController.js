const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const register = async (req, res) => {
  const { username, password, email, role } = req.body;

  try {
    // Проверка на существование пользователя
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(400).json({ error: 'Пользователь с таким именем уже существует.' });
    }

    // Проверка валидности пароля и email
    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Пароль должен содержать не менее 6 символов.' });
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ error: 'Введите корректный email.' });
    }

    // Хэшируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание нового пользователя
    const newUser = await User.create(username, hashedPassword, email, role);
    return res.status(201).json({ message: 'Пользователь успешно зарегистрирован', user: newUser });
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    res.status(500).json({ error: 'Произошла ошибка сервера.' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Поиск пользователя
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(400).json({ error: 'Неверное имя пользователя или пароль.' });
    }

    // Сравнение паролей
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Неверное имя пользователя или пароль.' });
    }

    // Создаем JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'development_secret', // Внимание: Замените на реальный секрет для продакшена
      { expiresIn: '1h' }
    );

    res.json({ token, message: 'Авторизация успешна.' });
  } catch (error) {
    console.error('Ошибка авторизации:', error);
    res.status(500).json({ error: 'Произошла ошибка сервера.' });
  }
};

module.exports = { register, login };
