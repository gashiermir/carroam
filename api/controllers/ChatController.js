/**
 * ChatController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// api/controllers/ChatController.js
// api/controllers/ChatController.js
module.exports = {
    create: async function (req, res) {
      try {
        const { receiver, message } = req.body;
        const sender = req.session.userId;
  
        if (!sender) {
          return res.forbidden('You are not permitted to perform this action.');
        }
  
        const newChat = await Chat.create({ message, sender, receiver }).fetch();
        return res.json(newChat);
      } catch (err) {
        return res.serverError(err);
      }
    },
  
    index: async function (req, res) {
      try {
        const userId = req.session.userId;
  
        const chats = await Chat.find({
          or: [
            { sender: userId },
            { receiver: userId }
          ]
        }).populate('sender').populate('receiver');
  
        const users = await User.find();
  
        return res.view('pages/chat/index', { chats: JSON.stringify(chats), users: JSON.stringify(users) });
      } catch (err) {
        return res.serverError(err);
      }
    },
  
    apiChats: async function (req, res) {
      try {
        const userId = req.session.userId;
  
        const chats = await Chat.find({
          or: [
            { sender: userId },
            { receiver: userId }
          ]
        }).populate('sender').populate('receiver');
  
        return res.json(chats);
      } catch (err) {
        return res.serverError(err);
      }
    },
  
    apiUsers: async function (req, res) {
      try {
        const users = await User.find();
        return res.json(users);
      } catch (err) {
        return res.serverError(err);
      }
    }
  };