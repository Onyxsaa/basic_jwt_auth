var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv');

// Özel yol belirleme
const envPath = '/home/onyx/Desktop/javascript/son/son/.env';
dotenv.config({ path: envPath });


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require("./routes/loginRouter.js")
var loginVerify = require("./routes/loginVerify.js")
var adminRouter = require("./routes/admin.js")
var logoutRouter = require("./routes/logout.js")
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/login", loginRouter)
app.use("/loginVerify", loginVerify)
app.use("/admin", adminRouter)
app.use("/logout", logoutRouter)



app.listen(3000, () => {
  console.log("server started at localhost:3000")
})





module.exports = app;
