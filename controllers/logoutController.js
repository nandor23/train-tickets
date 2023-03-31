const logout = (_req, res) => {
  res.clearCookie('token');
  res.locals.payload = undefined;
  res.redirect('/');
};

export default logout;
