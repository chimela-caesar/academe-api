'use strict';
import config from './config';
import bcrypt from 'bcrypt';

class User {
  constructor(obj) {
    for (let key in obj) {
      this[key] = obj[key];
    }
  }

  toJSON() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email
    };
  }

  save(cb) {
    if (this.id) {
      this.update(cb);
    } else {
      config().then(() => {
        this.hashPassword((err) => {
          if (err) return cb(err);
          config.db('users').insert(this, 'id').then(ids => {
            this.id = ids[0];
            cb();
          }).catch((err) => {
            cb(err);
          });
        });
      })
        .catch((err) => { cb(err) });
    }
  }

  update(cb) {
    config().then(() => {
      config.db('users').where({ id: this.id }).update(this).then(rows => {
        cb();
      }).catch((err) => {
        cb(err);
      });
    })
      .catch((err) => { cb(err) });
  }

  hashPassword(cb) {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) return cb(err);
      this.salt = salt;
      bcrypt.hash(this.pass, salt, (err, hash) => {
        if (err) return cb(err);
        this.pass = hash;
        cb();
      });
    });
  }

  static getByEmail(email, cb) {
    config().then(() => {
      config.db('users').where({ email }).first().then((user) => {
        if (user) return cb(null, new User(user));
        cb();
      }).catch((err) => {
        cb(err);
      });
    })
      .catch((err) => { cb(err) });
  }

  static getId(email, cb) {
    getByEmail(email, (err, user) => {
      if (err) return cb(err);
      cb(null, user.id);
    });
  }

  static get(id, cb) {
    config().then(() => {
      config.db('users').where({ id }).first().then((user) => {
        if (user) return cb(null, new User(user));
        cb();
      }).catch((err) => {
        cb(err);
      });
    })
      .catch((err) => { cb(err) });
  }

  static authenticate(email, pass, cb) {
    User.getByEmail(email, (err, user) => {
      if (err) return cb(err);
      if (!user) return cb();
      bcrypt.hash(pass, user.salt, (err, hash) => {
        if (err) return cb(err);
        if (hash == user.pass) return cb(null, user);
        cb();
      });
    });
  }
}

module.exports = User;
