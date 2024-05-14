/**
 * ChatController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    startSession: async function (req, res) {
        sails.log.debug("Start chat session....");
        try {
          let params = req.allParams();
          let auto = await Auto.findOne({ id: params.auto });
          if (!auto) {
            return res.notFound('Kein Auto mit dieser ID gefunden.');
          }
    
          let session = await ChatSession.create({
            mieter: req.session.userId,
            vermieter: auto.vermieter,
            auto: auto.id
          }).fetch();
    
          res.redirect(`/chat/session/${session.id}`);
        } catch (err) {
          sails.log.error(err);
          res.serverError(err);
        }
      },
    
      sendMessage: async function (req, res) {
        sails.log.debug("Send chat message....");
        try {
          let params = req.allParams();
          let session = await ChatSession.findOne({ id: params.session }).populate('messages');
          if (!session) {
            return res.notFound('Keine Sitzung mit dieser ID gefunden.');
          }
    
          let message = await ChatMessage.create({
            content: params.content,
            sender: req.session.userId,
            session: session.id
          }).fetch();
    
          res.redirect(`/chat/session/${session.id}`);
        } catch (err) {
          sails.log.error(err);
          res.serverError(err);
        }
      },
    
      viewSession: async function (req, res) {
        sails.log.debug("View chat session....");
        try {
          let session = await ChatSession.findOne({ id: req.params.id }).populate('messages');
          if (!session) {
            return res.notFound('Keine Sitzung mit dieser ID gefunden.');
          }
    
          res.view('pages/chat/session', { session });
        } catch (err) {
          sails.log.error(err);
          res.serverError(err);
        }
      }

};

