import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import config from '../config';

const authrouter = express.Router();

const setIntent = intent => localStorage.setItem('authIntent', intent);

const loginIntent = (req, res, next) => {
  setIntent('login');
  next();
};

const registerIntent = (req, res, next) => {
  setIntent('register');
  next();
};

const authCallback = (req, res) => {
  const { exist, profilejson, author } = req;
  const authIntent = localStorage.getItem('authIntent');
  const expiresIn = 60 * 60 * 24 * 7; // 7 days

  let tokendata = null;
  if (exist === false) {
    tokendata = { displayname: profilejson.name, email: profilejson.email };
  } else {
    tokendata = author;
  }

  const token = jwt.sign(tokendata, config.auth.jwt.secret, { expiresIn });
  res.cookie('id_token', token, {
    maxAge: 1000 * expiresIn,
    httpOnly: true,
    sameSite: 'Strict',
  });

  /**
   * If user try to login but did not exist on application,
   * present an opportunity to become a signed user
   */
  if (authIntent === 'login' && exist === false) {
    res.redirect('/register');
  } else {
    res.redirect('/');
  }
};

/**
 * universal logout from handles login from all
 */

authrouter.get('/logout', (req, res) => {
  // eslint-disable-next-line consistent-return
  res.clearCookie('id_token');
  res.redirect('/');
});

/**
 * facebook
 */
authrouter.get(
  '/login/facebook',
  loginIntent,
  passport.authenticate('facebook', {
    scope: ['email', 'user_location'],
    session: false,
  }),
);

authrouter.get(
  '/register/facebook',
  registerIntent,
  passport.authenticate('facebook', {
    scope: ['email', 'user_location'],
    session: false,
  }),
);

authrouter.get(
  '/auth/facebook/return',
  passport.authenticate('facebook', {
    failureRedirect: '/login',
    session: false,
  }),
  authCallback,
);

/**
 * google
 */

authrouter.get(
  '/login/google',
  loginIntent,
  passport.authenticate('google', {
    scope: ['email', 'profile'],
    session: false,
  }),
);

authrouter.get(
  '/register/google',
  registerIntent,
  passport.authenticate('google', {
    scope: ['email', 'profile'],
    session: false,
  }),
);

authrouter.get(
  '/auth/google/return',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: false,
  }),
  authCallback,
);

export default authrouter;
