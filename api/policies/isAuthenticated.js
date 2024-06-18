module.exports = async function (req, res, proceed) {
  if (req.session.userId) {
    const user = await User.findOne({ id: req.session.userId });
    if (user) {
      req.user = user;
      return proceed();
    }
  }
  return res.redirect('/login');
};
