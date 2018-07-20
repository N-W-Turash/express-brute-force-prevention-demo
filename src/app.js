import express from 'express';
import bodyParser from 'body-parser';
import RateLimit from 'express-rate-limit';
import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const apiLimiter = new RateLimit({
  windowMs: 1*60*1000, // 1 minutes
  max: 5,
  delayMs: 0, // disabled
  message: "Too many requests!",
  handler: function (req, res, /*next*/) {
    return res.status(429).json({error: {message: 'Too many requests!'}});
  }
});

app.use('/', apiLimiter);

// Routes
app.use('/', routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .render('error', {
      message: err.message
    });
});

export default app;
