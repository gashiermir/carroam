module.exports = async function (req, res, proceed) {
  if (req.session.userRole === 'admin') {
    return proceed();
  }
  return res.forbidden('You are not allowed to perform this action.');
};
