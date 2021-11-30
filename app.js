var createError = require('http-errors');
var express = require('express');
var expressSession = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog');
var productRouter = require('./routes/product');
var catalogadminRouter = require('./routes/catalog_admin');
var cartRouter = require('./routes/cart');
var thanhtoanRouter = require('./routes/thanhtoan');

const methodOverride = require('method-override');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({secret: 'your secret', saveUninitialized: true, resave: false}));
app.use(methodOverride('_method'));
app.use(fileUpload());
app.use(express.static('upload'));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/danh-muc', catalogRouter);
app.use('/san-pham', productRouter);
app.use('/sach', catalogadminRouter);
app.use('/gio-hang', cartRouter);
app.use('/thanh-toan', thanhtoanRouter);


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
