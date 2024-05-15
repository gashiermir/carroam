/**
 * BewertungController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  // Get a list of all Bewertungen
  index: async function (req, res) {
    try {
      const bewertungen = await Bewertung.find().populate('benutzer').populate('angebote');
      return res.view('pages/bewertung/index', { bewertungen });
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Render a form to create a new Bewertung
  new: async function (req, res) {
    try {
      const angebote = await Angebot.find();
      const benutzer = await User.find();
      return res.view('pages/bewertung/new', { angebote, benutzer });
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Create a new Bewertung
  create: async function (req, res) {
    try {
      const newBewertung = await Bewertung.create(req.body).fetch();
      return res.redirect(`/bewertung/${newBewertung.id}`);
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Show a single Bewertung
  show: async function (req, res) {
    try {
      const bewertung = await Bewertung.findOne(req.params.id).populate('benutzer').populate('angebote');
      if (!bewertung) {
        return res.notFound();
      }
      return res.view('pages/bewertung/show', { bewertung });
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Render a form to edit an existing Bewertung
  edit: async function (req, res) {
    try {
      const bewertung = await Bewertung.findOne(req.params.id);
      if (!bewertung) {
        return res.notFound();
      }
      const angebote = await Angebot.find();
      const benutzer = await User.find();
      return res.view('pages/bewertung/edit', { bewertung, angebote, benutzer });
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Update an existing Bewertung
  update: async function (req, res) {
    try {
      const updatedBewertung = await Bewertung.updateOne(req.params.id).set(req.body);
      if (!updatedBewertung) {
        return res.notFound();
      }
      return res.redirect(`/bewertung/${updatedBewertung.id}`);
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Delete an existing Bewertung
  delete: async function (req, res) {
    try {
      await Bewertung.destroyOne(req.params.id);
      return res.redirect('/bewertung');
    } catch (err) {
      return res.serverError(err);
    }
  }
};
