module.exports = {
  find: async function (req, res) {
    try {
      const userId = req.session.userId;
      const chats = await Chat.find().populate('participants').populate('messages');
      const userChats = chats.filter(chat => chat.participants.some(p => p.id === userId));
      return res.view('pages/chat/index', { chats: userChats });
    } catch (err) {
      return res.serverError(err);
    }
  },

  findOne: async function (req, res) {
    try {
      const chat = await Chat.findOne({ id: req.params.id }).populate('participants').populate('messages');
      if (!chat) {
        return res.notFound();
      }
      return res.view('pages/chat/show', { chat });
    } catch (err) {
      return res.serverError(err);
    }
  },

  new: async function (req, res) {
    try {
      const users = await User.find();
      return res.view('pages/chat/new', { users });
    } catch (err) {
      return res.serverError(err);
    }
  },

  delete: async function (req, res) {
    try {
      const chatId = req.params.id;

      // Überprüfen, ob der Chat existiert
      const chat = await Chat.findOne({ id: chatId }).populate('messages');
      if (!chat) {
        return res.notFound('Chat not found');
      }

      // Löschen der Nachrichten
      await Message.destroy({ chat: chatId });

      // Löschen des Chats
      await Chat.destroyOne({ id: chatId });

      return res.redirect('/chat');
    } catch (err) {
      return res.serverError(err);
    }
  },

  create: async function (req, res) {
    try {
      const sender = req.session.userId;
      const { receiver, content } = req.body;

      // Sicherstellen, dass der Empfänger ausgewählt wurde
      if (!receiver) {
        return res.badRequest('Receiver must be selected');
      }
      
      // Find a chat that has exactly the same participants
      let existingChats = await Chat.find().populate('participants');
      let chat = existingChats.find(c => {
        const participantIds = c.participants.map(p => p.id).sort();
        return participantIds.length === 2 && participantIds.includes(sender) && participantIds.includes(receiver);
      });

      if (!chat) {
        chat = await Chat.create({ participants: [sender, receiver] }).fetch();
      }

      await Message.create({ content, sender: sender, receiver: receiver, chat: chat.id });

      return res.redirect(`/chat/${chat.id}`);
    } catch (err) {
      return res.serverError(err);
    }
  },

  show: async function (req, res) {
    try {
      const chatId = req.params.id;
      const chat = await Chat.findOne({ id: chatId }).populate('participants');
      if (!chat) {
        return res.notFound('Chat not found');
      }

      const messages = await Message.find({ chat: chatId }).populate('sender').sort('createdAt ASC');

      return res.view('pages/chat/show', {
        chat,
        messages,
        session: req.session
      });
    } catch (err) {
      return res.serverError(err);
    }
  },

  createOrGet: async function (req, res) {
    try {
      const { participants } = req.body;

      // Prüfen, ob bereits ein Chat mit denselben Teilnehmern existiert
      let chat = await Chat.findOne({
        participants: { contains: participants.sort() }
      }).populate('participants');

      if (!chat) {
        // Wenn kein Chat existiert, erstellen Sie einen neuen
        chat = await Chat.create({ participants }).fetch();
      }

      return res.redirect(`/chat/${chat.id}`);
    } catch (err) {
      return res.serverError(err);
    }
  }
};