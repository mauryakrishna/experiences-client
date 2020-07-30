import passport from 'passport';
import fblogin from './passport-fb';

/**
 * Sign in with Facebook.
 */
passport.use(fblogin);

export default passport;
