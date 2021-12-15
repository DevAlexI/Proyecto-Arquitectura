const Sentry = require('@sentry/node');
const Tracing = require("@sentry/tracing");

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var tasksRouter = require('./routes/tasks');
var authRouter = require('./routes/auth');
var paymentRouter = require('./routes/payment');
var operationsRouter = require('./routes/operations');
var shipmentRouter = require('./routes/shipment');

var app = express();

						   
// view engine setup
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/auth', authRouter);
app.use('/', indexRouter);
app.use('/tasks', tasksRouter);
app.use('/shipment', shipmentRouter);
app.use('/payment', paymentRouter);
app.use('/operations', operationsRouter);
						  
Sentry.init({
    dsn: "https://518bfd7decb04b4499ab8655695969c0@o1062931.ingest.sentry.io/6104334",
    integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        new Tracing.Integrations.Express({ app }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());
// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

app.use(
    Sentry.Handlers.errorHandler({
      shouldHandleError(error) {
        // Capture all 404 and 500 errors
        if (error.status === 404 || error.status === 500) {
          return true;
        }
        return false;
      },
    })
  );

app.get("/debug-sentry", function mainHandler(req, res) {
    res.statusCode = 500;
    throw new Error("My first Sentry error!");
});

module.exports = app;
