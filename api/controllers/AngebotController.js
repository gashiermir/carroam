/**
 * AngebotController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    // Get a list of all Angebote
    index: async function (req, res) {
      try {
        const userId = req.session.userId;
        const userRole = req.session.userRole;
  
        let angebote;
  
        if (userRole === 'admin') {
          // Admins sehen alle Angebote
          angebote = await Angebot.find().populate('vermieter').populate('modelle').populate('buchungen').populate('bewertungen');
        } else if (userRole === 'vermieter') {
          // Vermieter sehen nur ihre eigenen Angebote
          angebote = await Angebot.find({ vermieter: userId }).populate('vermieter').populate('modelle').populate('buchungen').populate('bewertungen');
        } else {
          return res.forbidden('You are not allowed to view these offers.');
        }
  
        return res.view('pages/angebot/index', { angebote });
      } catch (err) {
        return res.serverError(err);
      }
    },
  
  
    // Render a form to create a new Angebot
    new: async function (req, res) {
      try {
        const modelle = await Modell.find();
        const userRole = req.session.userRole;
  
        if (userRole === 'admin') {
          const vermieter = await User.find({ role: 'vermieter' }); // Nur Benutzer mit der Rolle 'vermieter'
          return res.view('pages/angebot/new', { modelle, vermieter });
        } else {
          return res.view('pages/angebot/new', { modelle });
        }
      } catch (err) {
        return res.serverError(err);
      }
    },
  
    // Create a new Angebot
    create: async function (req, res) {
      try {
        const userId = req.session.userId;
        const userRole = req.session.userRole;
        let newAngebotData = req.body;
  
        if (userRole === 'vermieter') {
          newAngebotData.vermieter = userId; // Setze den Vermieter auf den aktuell eingeloggten Vermieter
        }
  
        const newAngebot = await Angebot.create(newAngebotData).fetch();
        return res.redirect(`/angebot/${newAngebot.id}`);
      } catch (err) {
        return res.serverError(err);
      }
    },
  
    // Show a single Angebot
    show: async function (req, res) {
      try {
        const angebot = await Angebot.findOne(req.params.id).populate('vermieter').populate('modelle').populate('buchungen').populate('bewertungen');
        if (!angebot) {
          return res.notFound();
        }
        return res.view('pages/angebot/show', { angebot });
      } catch (err) {
        return res.serverError(err);
      }
    },
  
  // Render a form to edit an existing Angebot
edit: async function (req, res) {
  try {
    const angebot = await Angebot.findOne(req.params.id).populate('modelle');
    if (!angebot) {
      return res.notFound();
    }
    const modelle = await Modell.find();
    const marken = await Marke.find();
    const userRole = req.session.userRole;

    if (userRole === 'admin') {
      const vermieter = await User.find({ role: 'vermieter' }); // Nur Benutzer mit der Rolle 'vermieter'
      return res.view('pages/angebot/edit', { angebot, modelle, marken, vermieter, userRole });
    } else {
      return res.view('pages/angebot/edit', { angebot, modelle, marken, userRole });
    }
  } catch (err) {
    return res.serverError(err);
  }
},

  
    // Update an existing Angebot
    update: async function (req, res) {
      try {
        const updatedAngebot = await Angebot.updateOne(req.params.id).set(req.body);
        if (!updatedAngebot) {
          return res.notFound();
        }
        return res.redirect(`/angebot/${updatedAngebot.id}`);
      } catch (err) {
        return res.serverError(err);
      }
    },
  
    // Delete an existing Angebot
    delete: async function (req, res) {
      try {
        await Angebot.destroyOne(req.params.id);
        return res.redirect('/angebot');
      } catch (err) {
        return res.serverError(err);
      }
    },

    showApi: async function (req, res) {
      try {
        const angebot = await Angebot.findOne(req.params.id).populate('vermieter').populate('modelle').populate('buchungen').populate('bewertungen');
        if (!angebot) {
          return res.notFound();
        }
        return res.json(angebot); // Rückgabe der Daten als JSON
      } catch (err) {
        return res.serverError(err);
      }},


      publicShow: async function (req, res) {
        const angebotId = req.params.id;
        const { standort, abholdatum, rueckgabedatum } = req.query;
    
        try {
          const angebot = await Angebot.findOne({ id: angebotId }).populate('modelle').populate('vermieter');
          if (!angebot) {
            return res.notFound();
          }
          return res.view('pages/angebot/publicShow', { 
            angebot, 
            standort, 
            abholdatum, 
            rueckgabedatum 
          });
        } catch (error) {
          return res.serverError(error);
        }
      },
    
      contact: async function (req, res) {
        const angebotId = req.params.angebotId;
        try {
          return await sails.controllers.chat.findOrCreateChat(req, res);
        } catch (err) {
          return res.serverError(err);
        }
      }

    
  };
  

