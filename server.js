const express = require('express');
const expressHbs = require('express-handlebars');  // Импортируем express-handlebars
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const courseRoutes = require('./routes/courseRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const userRoutes = require('./routes/userRoutes');
const multer = require('multer');
const path = require('path');
const WebSocket = require('ws');
const bodyParser = require('body-parser');

// Настройка переменных окружения
dotenv.config();

const app = express();

// Настройка Handlebars
const hbs = expressHbs.create(); // Создаем экземпляр Handlebars
app.engine('handlebars', hbs.engine);  // Подключаем Handlebars как движок
app.set('view engine', 'handlebars');  // Устанавливаем Handlebars как шаблонизатор

// Статические файлы (CSS, изображения и т.д.)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.render('main', { title: 'Главная страница' }); // Рендеринг main.handlebars
});

// Настройка парсинга тела запроса
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Маршруты
app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);
app.use('/lessons', lessonRoutes);
app.use('/users', userRoutes);

// WebSocket сервер
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    ws.send(`Echo: ${message}`);
  });
});

// Пример для использования WebSocket
app.server = app.listen(process.env.PORT || 3005, () => {
  console.log('Server running...');
});

// Обработка WebSocket
app.server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});
