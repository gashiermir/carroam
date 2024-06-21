// api/controllers/AuthController.js
const bcrypt = require('bcrypt');

module.exports = {
  login: async function(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.view('pages/login', { errorMessage: 'Email und Passwort erforderlich' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.view('pages/login', { errorMessage: 'Ungültige Email oder Passwort' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.view('pages/login', { errorMessage: 'Ungültige Email oder Passwort' });
    }

    // Benutzer authentifiziert
    req.session.userId = user.id;
    req.session.userRole = user.role;

    return res.redirect('/dashboard');
  },

  showLogin: function(req, res) {
    return res.view('pages/login', { errorMessage: null });
  },

  signup: async function(req, res) {
    const { vorname, nachname, adresse, plz, ort, email, password } = req.body;

    if (!vorname || !nachname || !adresse || !plz || !ort || !email || !password) {
      return res.view('pages/signup', { errorMessage: 'Alle Felder sind erforderlich' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const newUser = await User.create({
        vorname,
        nachname,
        adresse,
        plz,
        ort,
        email,
        password: hashedPassword
      }).fetch();

      req.session.userId = newUser.id;
      req.session.userRole = newUser.role;

      return res.redirect('/dashboard');
    } catch (error) {
      return res.view('pages/signup', { errorMessage: 'Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.' });
    }
  },

  showSignup: function(req, res) {
    return res.view('pages/signup', { errorMessage: null });
  },

  logout: function (req, res) {
    req.session.userId = null;
    req.session.userRole = null;
    return res.redirect('/login');
  }
};
