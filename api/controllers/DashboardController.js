// api/controllers/DashboardController.js
module.exports = {
    showDashboard: async function (req, res) {
      if (!req.session.userId) {
        return res.redirect('/login');
      }
  
      const user = await User.findOne({ id: req.session.userId });
      if (!user) {
        return res.redirect('/login');
      }
  
      return res.view('pages/dashboard', { userRole: user.role });
    }
  };
  