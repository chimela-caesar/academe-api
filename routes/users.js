import User from '../models/user';

exports.signup = (req, res, next) => {
  const data = req.body;
  User.getByEmail(data.email, (err, user) => {
    if (user) return next(new Error('Email already exists'));
    user = new User({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      pass: data.pass
    });
    user.save((err) => {
      if (err) return next(err);
      req.session.uid = user.id;
      res.json({ message: 'User successfully created' });
    });
  });
};

exports.signin = (req, res, next) => {
  const data = req.body;
  User.authenticate(data.email, data.pass, (err, user) => {
    if (err) return next(err);
    if (user) {
      req.session.uid = user.id;
      res.json(user);
    } else {
      return next(new Error('Sorry! invalid credentials'));
    }
  });
};

exports.signout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.json({ message: 'User successfully signed out' });
  })
};
