var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var funcionarioRouter = require ('./routes/funcionario');
var clienteRouter = require ('./routes/cliente');
var pagamentoRouter = require ('./routes/pagamento');
var horarioRouter = require ('./routes/horario');
var cargoRouter = require ('./routes/cargo');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/funcionario',funcionarioRouter);
app.use('/cliente',clienteRouter);
app.use('/pagamento',pagamentoRouter);
app.use('/horarios',horarioRouter);
app.use('/cargo',cargoRouter);

const moment = require('moment');
app.locals.moment = moment; // Disponibiliza o moment para os templates EJS




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
