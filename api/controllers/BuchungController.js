/**
 * BuchungController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    create: async function (req, res) {
        sails.log.debug("Create new booking....");
        try {
          let params = req.allParams();
          params.buchungsdatum = new Date(); // Setze das Buchungsdatum auf das aktuelle Datum
          let buchung = await Buchung.create(params).fetch();
          res.redirect('/buchung');
        } catch (err) {
          sails.log.error(err);
          res.serverError(err);
        }
      },
    
      find: async function (req, res) {
        sails.log.debug("List bookings....");
        let buchungen = await Buchung.find().populate('mieter').populate('auto');
        res.view('pages/buchung/index', { buchungen });
      },
    
      show: async function (req, res) {
        sails.log.debug("Show single booking....");
        let buchung = await Buchung.findOne({ id: req.params.id }).populate('mieter').populate('auto');
        if (!buchung) {
          return res.notFound('Keine Buchung mit dieser ID gefunden.');
        }
        res.view('pages/buchung/show', { buchung });
      },
    
      edit: async function (req, res) {
        sails.log.debug("Edit single booking....");
        let buchung = await Buchung.findOne({ id: req.params.id }).populate('mieter').populate('auto');
        if (!buchung) {
          return res.notFound('Keine Buchung mit dieser ID gefunden.');
        }
        let autos = await Auto.find();
        let mieter = await User.find({ role: 'user' });
        res.view('pages/buchung/edit', { buchung, autos, mieter });
    },
    
      update: async function (req, res) {
        sails.log.debug("Update booking....");
        let params = req.allParams();
        let updatedBuchung = await Buchung.updateOne({ id: req.params.id }).set(params);
        if (!updatedBuchung) {
          return res.notFound('Keine Buchung mit dieser ID gefunden.');
        }
        res.redirect('/buchung');
      },
    
      destroy: async function (req, res) {
        sails.log.debug("Delete single booking....");
        try {
          let deletedBuchung = await Buchung.destroyOne({ id: req.params.id });
          if (!deletedBuchung) {
            sails.log.debug("No booking found with that ID.");
            return res.notFound('Keine Buchung mit dieser ID gefunden.');
          }
          res.redirect('/buchung');
        } catch (err) {
          sails.log.error(err);
          res.serverError(err);
        }
      },
    
      new: async function (req, res) {
        sails.log.debug("Show form to create new booking....");
        let autos = await Auto.find();
        let mieter = await User.find({ role: 'user' });
        res.view('pages/buchung/new', { autos, mieter });
      }

};

