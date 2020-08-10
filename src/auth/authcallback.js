import afterauth from './afterauth';

export default async (req, accessToken, refreshToken, profile, done) => {
  const { exist, author } = await afterauth(profile);
  req.exist = exist;
  req.author = author;
  // eslint-disable-next-line no-underscore-dangle
  req.profilejson = profile._json;
  done(null, req);
};
