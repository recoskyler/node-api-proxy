const auth = (req, res, next) => {
  if (req.headers.authorization !== process.env.AUTH_TOKEN) {
    return res.status(401).send('Unauthorized');
  }

  next();
};

export default auth;
