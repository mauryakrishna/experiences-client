import { Strategy as FacebookStrategy } from 'passport-facebook';
import config from '../config';
import afterauth from './afterauth';

const facebookOptionsLogin = {
  clientID: config.auth.facebook.id,
  clientSecret: config.auth.facebook.secret,
  callbackURL: '/login/facebook/return',
  profileFields: ['displayName', 'name', 'email', 'link', 'locale', 'timezone'],
  passReqToCallback: true,
};

const facebookCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done,
) => {
  await afterauth(profile);
  done(null, req.user);
};

export default new FacebookStrategy(facebookOptionsLogin, facebookCallback);
