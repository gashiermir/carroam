module.exports = async function (req, res, proceed) {
  const userId = req.session.userId;
  const userRole = req.session.userRole;
  const profileId = req.params.id;

  // Check if the user is an admin
  if (userRole === 'admin') {
    return proceed();
  }

  // Check if the user is the owner of the profile
  if (userId == profileId) { // Use loose equality to compare different types
    return proceed();
  }

  return res.forbidden('You are not allowed to perform this action.');
};
