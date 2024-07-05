/**
 * BuchungController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */



module.exports = {
  // Get a list of all Buchungen
  index: async function (req, res) {
    try {
      const userId = req.session.userId;
      const userRole = req.session.userRole;

      let buchungen;

      if (userRole === 'admin') {
        // Admins sehen alle Buchungen
        buchungen = await Buchung.find().populate('mieter').populate('angebote');
      } else if (userRole === 'vermieter') {
        // Vermieter sehen nur ihre eigenen Angebote
        // Zuerst finden wir alle Angebote des Vermieters
        const angebote = await Angebot.find({ vermieter: userId });
        const angebotIds = angebote.map(a => a.id);

        // Dann finden wir alle Buchungen für diese Angebote oder vom Vermieter als Mieter
        buchungen = await Buchung.find({
          or: [
            { angebote: { in: angebotIds } },
            { mieter: userId }
          ]
        }).populate('mieter').populate('angebote');
      } else if (userRole === 'mieter') {
        // Mieter sehen nur ihre eigenen Buchungen
        buchungen = await Buchung.find({ mieter: userId }).populate('mieter').populate('angebote');
      } else {
        return res.forbidden('You are not allowed to view these bookings.');
      }

      return res.view('pages/buchung/index', { buchungen });
    } catch (err) {
      return res.serverError(err);
    }
  },


  // Render a form to create a new Buchung
new: async function (req, res) {
  try {
    const angebote = await Angebot.find();
    const mieter = await User.find();
    return res.view('pages/buchung/new', { angebote, mieter });
  } catch (err) {
    return res.serverError(err);
  }
},

  // Create a new Buchung
  create: async function (req, res) {
    try {
      const newBuchung = await Buchung.create(req.body).fetch();
      return res.redirect(`/buchung/${newBuchung.id}`);
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Show a single Buchung
  show: async function (req, res) {
    try {
      const buchung = await Buchung.findOne({ id: req.params.id })
        .populate('mieter')
        .populate('angebote');
  
      if (!buchung) {
        return res.notFound();
      }
  
      if (buchung.angebote) {
        const angebot = await Angebot.findOne({ id: buchung.angebote.id }).populate('vermieter');
        buchung.angebote = angebot;
      }
  
      return res.view('pages/buchung/show', { buchung });
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Render a form to edit an existing Buchung
  edit: async function (req, res) {
    try {
      const buchung = await Buchung.findOne(req.params.id);
      if (!buchung) {
        return res.notFound();
      }
      const angebote = await Angebot.find();
      const mieter = await User.find();
      return res.view('pages/buchung/edit', { buchung, angebote, mieter });
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Update an existing Buchung
  update: async function (req, res) {
    try {
      const updatedBuchung = await Buchung.updateOne(req.params.id).set(req.body);
      if (!updatedBuchung) {
        return res.notFound();
      }
      return res.redirect(`/buchung/${updatedBuchung.id}`);
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Delete an existing Buchung
  delete: async function (req, res) {
    try {
      await Buchung.destroyOne(req.params.id);
      return res.redirect('/buchung');
    } catch (err) {
      return res.serverError(err);
    }
  }
};


