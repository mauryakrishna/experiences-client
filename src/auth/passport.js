import passport from 'passport';
import fblogin from './facebook';

/**
 * Sign in with Facebook.
 */
passport.use(fblogin);

export default passport;
