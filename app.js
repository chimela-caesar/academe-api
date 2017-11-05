'use strict';
import express from 'express';
import session from 'express-session';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import userinfo from './middleware/user';
import auth from './middleware/auth';
import routes from './routes/index';
import users from './routes/users';
import students from './routes/students';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));

app.use(userinfo);

// enable cross-origin resource sharing
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.send(200);
  }
  else {
    next();
  }
});

app.post('/users/signup', users.signup);
app.post('/users/signin', users.signin);
app.post('/users/signout', users.signout);

app.get('/students', students.all);
app.post('/students', students.create);
app.get('/students/:id', students.find);
app.put('/students/:id', students.update);
app.delete('/students/:id', students.delete);

// using authentication middleware
/*
app.get('/students', auth, students.all);
app.post('/students', auth, students.create);
app.get('/students/:id', auth, students.find);
app.put('/students/:id', auth, students.update);
app.delete('/students/:id', auth, students.delete);
*/

app.use(routes.notfound);
app.use(routes.error);

module.exports = app;
