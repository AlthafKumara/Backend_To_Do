const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const errorHandler = require('./middlewares/errorHandler');
const AppError = require('./utils/appError');

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());

// Routes
const authRouter = require('./routes/authRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const todoRouter = require('./routes/todoRoutes');

app.get('/', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Welcome to the Todo API' });
});

app.use('/auth', authRouter);
app.use('/categories', categoryRouter);
app.use('/todos', todoRouter);

// 404 Handler
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
