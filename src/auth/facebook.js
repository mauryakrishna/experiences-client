import { Strategy as FacebookStrategy } from 'passport-facebook';
import config from '../config';
import authcallback from './authcallback';

const facebookOptionsLogin = {
  clientID: config.auth.facebook.id,
  clientSecret: config.auth.facebook.secret,
  callbackURL: '/auth/facebook/return',
  profileFields: ['id', 'email', 'displayName'],
  passReqToCallback: true,
};

export default new FacebookStrategy(facebookOptionsLogin, authcallback);
