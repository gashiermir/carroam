const bcrypt = require('bcryptjs');

module.exports = {

  create: async function (req, res) {
    sails.log.debug("Create new user....");
    try {
      let user = await User.create(req.allParams()).fetch();
      res.redirect('/user');
    } catch (err) {
      sails.log.error(err);
      res.serverError(err);
    }
  },

  find: async function (req, res) {
    sails.log.debug("List users....");
    if (!req.session.userId) {
      return res.redirect('/login');
    }

    const user = await User.findOne({ id: req.session.userId });
    if (!user) {
      return res.redirect('/login');
    }

    let users = await User.find();
    res.view('pages/user/index', { userRole: user.role, users: users });
  },

  show: async function (req, res) {
    sails.log.debug("Show single user....");
    let user = await User.findOne({ id: req.params.id }).populate('angebote').populate('buchungen');
    if (!user) {
      return res.notFound('Kein Benutzer mit dieser ID gefunden.');
    }
    res.view('pages/user/show', { user, userRole: req.user.role });
  },

  edit: async function (req, res) {
    sails.log.debug("Edit single user....");
    let user = await User.findOne({ id: req.params.id });
    if (!user) {
      return res.notFound('Kein Benutzer mit dieser ID gefunden.');
    }
    res.view('pages/user/edit', { user, userRole: req.user.role });
  },

  update: async function (req, res) {
    sails.log.debug("Update user....");
    let params = req.allParams();

    // Falls das Passwort geändert wird, verschlüsseln wir es erneut
    if (params.password) {
      params.password = await bcrypt.hash(params.password, 10);
    }

    let updatedUser = await User.updateOne({ id: req.params.id }).set(params);
    if (!updatedUser) {
      return res.notFound('Kein Benutzer mit dieser ID gefunden.');
    }
    res.redirect('/user');
  },

  destroy: async function (req, res) {
    sails.log.debug("Delete single user....");
    try {
      let deletedUser = await User.destroyOne({ id: req.params.id });
      if (!deletedUser) {
        sails.log.debug("No user found with that ID.");
        return res.notFound('Kein Benutzer mit dieser ID gefunden.');
      }
      res.redirect('/user');
    } catch (err) {
      sails.log.error(err);
      res.serverError(err);
    }
  },

  new: function (req, res) {
    sails.log.debug("Show form to create new user....");
    res.view('pages/user/new', { userRole: req.user.role });
  },

  signup: async function(req, res) {
    const { vorname, nachname, adresse, plz, ort, email, password } = req.body;

    if (!vorname || !nachname || !adresse || !plz || !ort || !email || !password) {
      return res.status(400).json({ errorMessage: 'Alle Felder sind erforderlich' });
    }

    try {
      const newUser = await User.create({
        vorname,
        nachname,
        adresse,
        plz,
        ort,
        email,
        password
      }).fetch();

      req.session.userId = newUser.id;
      req.session.userRole = newUser.role;

      return res.status(200).json({ message: 'Registrierung erfolgreich', user: newUser });
    } catch (error) {
      if (error.code === 'E_UNIQUE') {
        return res.status(400).json({ errorMessage: 'E-Mail ist bereits registriert.' });
      }
      return res.status(500).json({ errorMessage: 'Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.' });
    }
  },

  showSignup: function(req, res) {
    return res.view('pages/signup', { errorMessage: null });
  }
};
