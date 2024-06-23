/**
 * MarkeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // Get a list of all Marken
    index: async function (req, res) {
      try {
        const marken = await Marke.find().populate('modelle');
        return res.view('pages/marke/index', { marken });
      } catch (err) {
        return res.serverError(err);
      }
    },
  
    // Render a form to create a new Marke
    new: function (req, res) {
      return res.view('pages/marke/new');
    },
  
    // Create a new Marke
    create: async function (req, res) {
      try {
        const newMarke = await Marke.create(req.body).fetch();
        return res.redirect('/marke'); // Redirekt zur Liste der Marken
      } catch (err) {
        return res.serverError(err);
      }
    },
  
    // Show a single Marke
    show: async function (req, res) {
      try {
        const marke = await Marke.findOne(req.params.id).populate('modelle');
        if (!marke) {
          return res.notFound();
        }
        return res.view('pages/marke/show', { marke });
      } catch (err) {
        return res.serverError(err);
      }
    },
  
    // Render a form to edit an existing Marke
    edit: async function (req, res) {
      try {
        const marke = await Marke.findOne(req.params.id).populate('modelle');
        if (!marke) {
          return res.notFound();
        }
        return res.view('pages/marke/edit', { marke });
      } catch (err) {
        return res.serverError(err);
      }
    },
  
    // Update an existing Marke
    update: async function (req, res) {
      try {
        const updatedMarke = await Marke.updateOne(req.params.id).set(req.body);
        if (!updatedMarke) {
          return res.notFound();
        }
        return res.redirect('/marke');
      } catch (err) {
        return res.serverError(err);
      }
    },
  
    // Delete an existing Marke
    delete: async function (req, res) {
      try {
        await Marke.destroyOne(req.params.id);
        return res.redirect('/marke');
      } catch (err) {
        return res.serverError(err);
      }
    }
  };
  

