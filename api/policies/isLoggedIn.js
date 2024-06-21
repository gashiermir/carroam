module.exports = async function (req, res, proceed) {
    if (req.session.userId) {
      // User is logged in, proceed to the next policy or controller action.
      return proceed();
    }
    
    // User is not logged in
    return res.redirect('/login');
  };
  