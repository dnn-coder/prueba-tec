const express = require('express');

const { usersRouter } = require('./routes/users.routes');
const { employeesRouter } = require('./routes/employees.routes');
const { solicitudesRouter } = require('./routes/solicitudes.routes');

const { globalErrorHandler } = require('./controllers/error.controller');

const app = express();

app.use(express.json());

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/employees', employeesRouter);
app.use('/api/v1/solicitudes', solicitudesRouter);

//global error handler

// manejador global de errores

app.all('*', (req, res, next) => {
  next(
    new AppError(
      `${req.method} ${req.originalUrl} not found in this server`,
      404
    )
  );
});

app.use('*', globalErrorHandler);

module.exports = { app };
