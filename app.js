var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var funcionarioRouter = require('./routes/funcionario');
var clienteRouter = require('./routes/cliente');
var pagamentoRouter = require('./routes/pagamento');
var horarioRouter = require('./routes/horario');
var cargoRouter = require('./routes/cargo');

var app = express();

// Configuração da View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors()); // CORS ativado

app.use('/funcionario', funcionarioRouter);
app.use('/cliente', clienteRouter);
app.use('/pagamento', pagamentoRouter);
app.use('/horarios', horarioRouter);
app.use('/cargo', cargoRouter);

const moment = require('moment');
app.locals.moment = moment;

// Tratamento de erro 404
app.use(function(req, res, next) {
  next(createError(404));
});

// Manipulador de erros
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;