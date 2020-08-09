import afterauth from './afterauth';

export default async (req, accessToken, refreshToken, profile, done) => {
  const { exist, author } = await afterauth(profile);
  req.exist = exist;
  req.author = author;
  done(null, req);
};
