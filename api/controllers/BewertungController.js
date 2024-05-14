/**
 * BewertungController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    create: async function (req, res) {
        sails.log.debug("Create new rating....");
        try {
          let params = req.allParams();
          let bewertung = await Bewertung.create(params).fetch();
          res.redirect('/bewertung');
        } catch (err) {
          sails.log.error(err);
          res.serverError(err);
        }
      },
    
      find: async function (req, res) {
        sails.log.debug("List ratings....");
        let bewertungen = await Bewertung.find().populate('benutzer').populate('buchung').populate('auto');
        res.view('pages/bewertung/index', { bewertungen });
      },
    
      show: async function (req, res) {
        sails.log.debug("Show single rating....");
        let bewertung = await Bewertung.findOne({ id: req.params.id }).populate('benutzer').populate('buchung').populate('auto');
        if (!bewertung) {
          return res.notFound('Keine Bewertung mit dieser ID gefunden.');
        }
        res.view('pages/bewertung/show', { bewertung });
      },
    
      edit: async function (req, res) {
        sails.log.debug("Edit single rating....");
        let bewertung = await Bewertung.findOne({ id: req.params.id }).populate('benutzer').populate('buchung').populate('auto');
        if (!bewertung) {
          return res.notFound('Keine Bewertung mit dieser ID gefunden.');
        }
        let buchungen = await Buchung.find().populate('auto');
        let benutzer = await User.find();
        res.view('pages/bewertung/edit', { bewertung, buchungen, benutzer });
      },
    
      update: async function (req, res) {
        sails.log.debug("Update rating....");
        let params = req.allParams();
        let updatedBewertung = await Bewertung.updateOne({ id: req.params.id }).set(params);
        if (!updatedBewertung) {
          return res.notFound('Keine Bewertung mit dieser ID gefunden.');
        }
        res.redirect('/bewertung');
      },
    
      destroy: async function (req, res) {
        sails.log.debug("Delete single rating....");
        try {
          let deletedBewertung = await Bewertung.destroyOne({ id: req.params.id });
          if (!deletedBewertung) {
            sails.log.debug("No rating found with that ID.");
            return res.notFound('Keine Bewertung mit dieser ID gefunden.');
          }
          res.redirect('/bewertung');
        } catch (err) {
          sails.log.error(err);
          res.serverError(err);
        }
      },
    
      new: async function (req, res) {
        sails.log.debug("Show form to create new rating....");
        let buchungen = await Buchung.find().populate('auto');
        let benutzer = await User.find();
        res.view('pages/bewertung/new', { buchungen, benutzer });
      }
  };
  