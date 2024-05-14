/**
 * ModellController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    create: async function (req, res) {
        sails.log.debug("Create new model....");
        let modell = await Modell.create(req.allParams()).fetch();
        res.redirect('/modell');
      },
    
      find: async function (req, res) {
        sails.log.debug("List models....");
        let modelle = await Modell.find();
        res.view('pages/modell/index', { modelle });
      },
    
      show: async function (req, res) {
        sails.log.debug("Show single model....");
        let modell = await Modell.findOne({ id: req.params.id });
        if (!modell) {
          return res.notFound('Kein Modell mit dieser ID gefunden.');
        }
        res.view('pages/modell/show', { modell });
      },
    
      edit: async function (req, res) {
        sails.log.debug("Edit single model....");
        let modell = await Modell.findOne({ id: req.params.id });
        if (!modell) {
          return res.notFound('Kein Modell mit dieser ID gefunden.');
        }
        res.view('pages/modell/edit', { modell });
      },
    
      update: async function (req, res) {
        sails.log.debug("Update model....");
        let params = req.allParams();
        let updatedModell = await Modell.updateOne({ id: req.params.id }).set(params);
        if (!updatedModell) {
          return res.notFound('Kein Modell mit dieser ID gefunden.');
        }
        res.redirect('/modell');
      },
    
      destroy: async function (req, res) {
        sails.log.debug("Delete single model....");
        try {
          let deletedModell = await Modell.destroyOne({ id: req.params.id });
          if (!deletedModell) {
            sails.log.debug("No model found with that ID.");
            return res.notFound('Kein Modell mit dieser ID gefunden.');
          }
          res.redirect('/modell');
        } catch (err) {
          sails.log.error(err);
          res.serverError(err);
        }
      },
    
      new: function (req, res) {
        sails.log.debug("Show form to create new model....");
        res.view('pages/modell/new');
      }

};

