/**
 * AutoControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// api/controllers/AutoController.js
module.exports = {

    search: async function (req, res) {
        try {
          let standort = req.query.standort;
          let abholdatum = req.query.abholdatum;
          let rueckgabedatum = req.query.rueckgabedatum;
    
          if (!standort || !abholdatum || !rueckgabedatum) {
            return res.badRequest('Alle Suchparameter müssen angegeben werden.');
          }
    
          // Suche nach Autos, die am angegebenen Standort verfügbar sind
          // und deren Verfügbarkeitsdaten mit den angegebenen Suchdaten übereinstimmen
          let autos = await Auto.find({
            standort: standort,
            verfügbarkeitVon: { '<=': new Date(abholdatum) },
            verfügbarkeitBis: { '>=': new Date(rueckgabedatum) }
          });
    
          res.view('pages/searchResults', { autos });
        } catch (err) {
          sails.log.error(err);
          res.serverError(err);
        }
      },
  
    create: async function (req, res) {
        sails.log.debug("Create new auto....")
        let auto = await Auto.create(req.allParams());
        res.redirect('/auto');
    },
    
    find: async function (req, res) { 
        sails.log.debug("List autos....");
        let autos;
        let modelle = await Modell.find();
        let vermieter = await User.find();

        if (req.query.q || req.query.vermieter || req.query.modell) {
            let query = {};

            // Suchbegriff für Beschreibung
            if (req.query.q && req.query.q.length > 0) {
                query.beschreibung = { 'contains': req.query.q };
            }
    
            // Vermieter
            if (req.query.vermieter && req.query.vermieter.length > 0) {
                query.vermieter = req.query.vermieter;
            }
    
            // Modell
            if (req.query.modell && req.query.modell.length > 0) {
                query.modelle = req.query.modell;
            }
    
            autos = await Auto.find(query).populate('vermieter').populate('modelle');
        } else {
            autos = await Auto.find().populate('vermieter').populate('modelle');  // Alle Autos anzeigen
        }
    
        res.view('pages/auto/index', { autos, modelle, vermieter });
    },
    
    destroy: async function (req, res) {
        sails.log.debug("Delete single auto....");
        try {
            let deletedAuto = await Auto.destroyOne({ id: req.params.id });
            if (!deletedAuto) {
                sails.log.debug("No auto found with that ID.");
                return res.notFound('Kein Auto mit dieser ID gefunden.');
            }
            res.redirect('/auto');
        } catch (err) {
            sails.log.error(err);
            return res.serverError('Fehler beim Löschen des Autos.');
        }
    },    
    

    // new: async function (req, res) {
    //    let modelle = await Modell.find();
    //    let vermieter = await User.find();
    //    res.view('pages/auto/new', { modelle, vermieter });
    // },

    new: async function (req, res) {
        sails.log.debug("Show form to create new auto....");
        let modelle = await Modell.find();
        let vermieter = await User.find();
        res.view('pages/auto/new', { modelle, vermieter });
    },
    

    findOne: async function (req, res) {
        sails.log.debug("List single auto....")
        let auto = await Auto.findOne({ id: req.params.id }).populate('vermieter').populate('modelle');
        let modelle = await Modell.find();
        let vermieter = await User.find();
        res.view('pages/auto/show', { auto, modelle, vermieter });
    },

    edit: async function (req, res) {
        sails.log.debug("Edit single auto....")
        let auto = await Auto.findOne({ id: req.params.id }).populate('vermieter').populate('modelle');
        let modelle = await Modell.find();
        let vermieter = await User.find();
        res.view('pages/auto/edit', { auto, modelle, vermieter });
    },

    update: async function (req, res) {
        sails.log.debug("Update auto....")
        let params = req.allParams();
        await Auto.updateOne({id: req.params.id}).set(params);
        res.redirect('/auto');
    },
};


