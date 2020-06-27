
const express = require('express');
const createError = require('http-errors');
const path = require('path');
const log4js = require('log4js');
const RemoteEndpoint = require("./routes/ext-endpoint.js");
// define routes
const search = require("./routes/search.js");
log4js.configure({
	appenders: { localhost: {type: 'dateFile', filename: 'localhost.log'} },
	categories: {default: { appenders: ['localhost'], level: 'warn', enableCallStack: true}}
});
const logger = log4js.getLogger('localhost');
logger.warn("using log4js");

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/resource', express.static(path.join(__dirname, '../static')));
app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

app.use("/get", search);
app.get('/', function(req, res, next) {
	if (app.get('loggedInUser')) {
		logger.warn("logged in user redirected to dashboard");
		res.redirect('/dashboard');
	} else {
		res.render('index', {title: "Login to view dashboard"});
	}
});

app.get('/dashboard', function(req, res, next) {
	if (app.get('loggedInUser')) {
		res.render('index', {title: "View and enroll customers", agentDetails: app.get("agentDetails")});
	} else {
		logger.warn("signed out user trying to access dashboard");
		res.redirect("/");
	}
});

app.post('/login', function(req, res, next) {
	logger.warn("request received for logging in");
	logger.warn("req : ", req.body);
	if (!req.body.mobile || !req.body.password) {
		// unreachable
		app.set("loggedInUser", false);
		res.redirect("/");
	} else {
		var req_data = {
			"countryCode": "91",
			"phoneNumber": req.body.mobile,
			"password": req.body.password
		};
		logger.warn("request data", req_data);
		RemoteEndpoint.checkLogin(req_data).then(function(data) {
			logger.warn("forwarding request to get agent details");
			app.set("agentAccessDetails", data);
			RemoteEndpoint.getAgentDetails(data).then(function(agentDetails) {
				app.set("loggedInUser", true);
				app.set("agentDetails", agentDetails);
				logger.warn("user logged in successfully");
				// try forwarding request
				res.redirect("/dashboard");
			}).catch(function(error) {
				app.set("loggedInUser", false);
				logger.warn("user could not login");
				res.redirect("/");
			});
		}).catch(function(error) {
			app.set("loggedInUser", false);
			logger.warn("user could not login");
			// next(error);
			res.redirect("/");
		});
	}
});

app.get('/logout', function(req, res, next) {
	logger.warn("user logging out");
	app.set("loggedInUser", false);
	res.redirect("/");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	console.log("error : ", err);
	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
