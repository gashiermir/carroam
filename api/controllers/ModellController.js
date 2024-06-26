/**
 * ModellController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


module.exports = {
  // Get a list of all Modelle
  index: async function (req, res) {
    try {
      const modelle = await Modell.find().populate('marke').populate('angebote');
      return res.view('pages/modell/index', { modelle });
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Render a form to create a new Modell
  new: async function (req, res) {
    const markeId = req.query.markeId;
    const markeBezeichnung = req.query.markeBezeichnung;

    return res.view('pages/modell/new', {
      markeId: markeId,
      markeBezeichnung: markeBezeichnung
    });
  },

  create: async function (req, res) {
    try {
      const newModell = await Modell.create(req.body).fetch();
      return res.redirect(`/marke/${newModell.marke}/edit`);
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Show a single Modell
  show: async function (req, res) {
    try {
      const modell = await Modell.findOne(req.params.id).populate('marke').populate('angebote');
      if (!modell) {
        return res.notFound();
      }
      return res.view('pages/modell/show', { modell });
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Render a form to edit an existing Modell
  edit: async function (req, res) {
    try {
        const modell = await Modell.findOne(req.params.id).populate('marke');
        if (!modell) {
            return res.notFound();
        }
        const marken = await Marke.find();
        return res.view('pages/modell/edit', { modell, marken });
    } catch (err) {
        return res.serverError(err);
    }
},

  // Update an existing Modell
  update: async function (req, res) {
    try {
      const updatedModell = await Modell.updateOne(req.params.id).set(req.body);
      if (!updatedModell) {
        return res.notFound();
      }
      return res.redirect(`/modell/${updatedModell.id}`);
    } catch (err) {
      return res.serverError(err);
    }
  },

  // Delete an existing Modell
  delete: async function (req, res) {
    try {
      await Modell.destroyOne(req.params.id);
      const redirectTo = req.body.redirectTo || '/modell';
      return res.redirect(redirectTo); // Leitet zurück zur vorherigen Seite
    } catch (err) {
      return res.serverError(err);
    }
  },
  
  findByMarke: async function(req, res) {
    try {
      const markeId = req.query.marke;
      const modelle = await Modell.find({ marke: markeId });
      return res.json(modelle);
    } catch (err) {
      return res.serverError(err);
    }
  }

  
};

