var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var nconf = require('nconf');
nconf.argv().env().file({file: path.join(__dirname, 'config.json')});

passport.use(new Strategy(function (username, password, callback) {
	if (username == 'admin' && password == 'password') {
		return callback(null, { id: 666, name: "Jose", lastName: "Luis", email: "luis@gmail.com", role: "manager" });
	} else {
		return callback(null, false)
	}
}));

passport.serializeUser(function (user, callback) {
	callback(null, user.id);
});

passport.deserializeUser(function (id, callback) {
	if (id == 666) {
		callback(null, { id: 666, name: "Jose", lastName: "Luis", email: "luis@gmail.com", role: "manager" });
	} else {
		//The user does not exists
		return callback(null, false)
	}
});

var indexRouter = require('./routes/index');
var entityRouter = require('./routes/entity');
var customerRouter = require('./routes/customer');
var cityRouter = require('./routes/city');
var productRouter = require('./routes/product');
var paymentRouter = require('./routes/payment');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// set app configurations from json file
app.set('config', nconf.get('configurations'));
var webServiceUrl = [
	app.get('config').webService.url,
	app.get('config').webService.apiPath,
	app.get('config').webService.apiVersion
].join('/');

var webServices = {}
Object.keys(app.get('config').webService.paths).forEach(function(key) {
	var methods = {};
	Object.keys(app.get('config').webService.paths[key]).forEach(function(method) {
		methods[method] = [webServiceUrl, app.get('config').webService.paths[key][method]].join('/');
	})
	webServices[key] = methods;
});
app.set('webServices', webServices);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', indexRouter);
app.use('/entity', entityRouter);
app.use('/customer', customerRouter);
app.use('/city', cityRouter);
app.use('/product', productRouter);
app.use('/payment', paymentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error/error');
});

module.exports = app;
