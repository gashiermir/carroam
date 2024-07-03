// ChatController.js
module.exports = {
  find: async function (req, res) {
    try {
      const userId = req.session.userId;
      const chats = await Chat.find()
        .populate('participants')
        .populate('messages')
        .populate('angebot');

      const userChats = chats.filter(chat => chat.participants.some(p => p.id === userId));

      for (const chat of userChats) {
        if (chat.angebot) {
          chat.angebot = await Angebot.findOne({ id: chat.angebot.id }).populate('modelle');
          if (chat.angebot && chat.angebot.modelle) {
            chat.angebot.modelle = await Modell.findOne({ id: chat.angebot.modelle.id }).populate('marke');
          }
        }
        chat.otherParticipant = chat.participants.find(p => p.id !== userId);
      }

      return res.view('pages/chat/index', { chats: userChats, session: req.session });
    } catch (err) {
      return res.serverError(err);
    }
  },

  findOne: async function (req, res) {
    try {
      const chat = await Chat.findOne({ id: req.params.id })
        .populate('participants')
        .populate('messages')
        .populate('angebot');

      if (!chat) {
        return res.notFound();
      }

      const buchungen = await Buchung.find({
        angebote: chat.angebot.id,
        or: [
          { mieter: req.session.userId },
          { mieter: chat.participants.find(p => p.id !== req.session.userId).id }
        ]
      }).populate('mieter');

      return res.view('pages/chat/show', {
        chat,
        messages: chat.messages,
        buchungen,
        session: req.session,
      });
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

      const chat = await Chat.findOne({ id: chatId }).populate('messages');
      if (!chat) {
        return res.notFound('Chat not found');
      }

      await Message.destroy({ chat: chatId });
      await Chat.destroyOne({ id: chatId });

      return res.redirect('/chat');
    } catch (err) {
      return res.serverError(err);
    }
  },

  create: async function (req, res) {
    try {
      const sender = req.session.userId;
      const { receiver, content, angebotId } = req.body;

      if (!receiver) {
        return res.badRequest('Receiver must be selected');
      }

      let existingChats = await Chat.find().populate('participants');
      let chat = existingChats.find(c => {
        const participantIds = c.participants.map(p => p.id).sort();
        return participantIds.length === 2 && participantIds.includes(sender) && participantIds.includes(receiver);
      });

      if (!chat) {
        chat = await Chat.create({ participants: [sender, receiver], angebot: angebotId }).fetch();
      }

      await Message.create({ content, sender, receiver, chat: chat.id });

      return res.redirect(`/chat/${chat.id}`);
    } catch (err) {
      return res.serverError(err);
    }
  },

  show: async function (req, res) {
    try {
      const chatId = req.params.id;
      const chat = await Chat.findOne({ id: chatId })
        .populate('participants')
        .populate('messages')
        .populate('angebot');

      if (!chat) {
        return res.notFound('Chat not found');
      }

      const messages = await Message.find({ chat: chatId }).populate('sender').sort('createdAt ASC');

      const buchungen = await Buchung.find({
        angebote: chat.angebot.id,
        or: [
          { mieter: req.session.userId },
          { mieter: chat.participants.find(p => p.id !== req.session.userId).id }
        ]
      }).populate('mieter');

      return res.view('pages/chat/show', {
        chat,
        messages,
        buchungen,
        session: req.session,
      });
    } catch (err) {
      return res.serverError(err);
    }
  },

  findOrCreateChat: async function (req, res) {
    try {
      const angebotId = req.params.angebotId;
      const currentUserId = req.session.userId;

      const angebot = await Angebot.findOne({ id: angebotId }).populate('vermieter');
      if (!angebot) {
        return res.notFound('Angebot not found');
      }

      const vermieterId = angebot.vermieter.id;

      let chats = await Chat.find({ angebot: angebotId }).populate('participants');

      let chat = chats.find(c => c.participants.some(p => p.id === currentUserId));

      if (!chat) {
        chat = await Chat.create({ participants: [currentUserId, vermieterId], angebot: angebotId }).fetch();
      }

      return res.redirect(`/chat/${chat.id}`);
    } catch (err) {
      return res.serverError(err);
    }
  },

  createBookingFromChat: async function (req, res) {
    try {
      const { chatId, preis, buchungVon, buchungBis } = req.body;
      const chat = await Chat.findOne({ id: chatId }).populate('participants').populate('angebot');

      if (!chat) {
        return res.notFound('Chat not found');
      }

      const currentUserId = req.session.userId;
      const otherParticipant = chat.participants.find(p => p.id !== currentUserId);

      if (!otherParticipant) {
        return res.serverError('Other participant not found in chat');
      }

      const buchungData = {
        preis: parseFloat(preis),
        status: 'offen',
        buchungsdatum: new Date(),
        buchungVon: new Date(buchungVon),
        buchungBis: new Date(buchungBis),
        mieter: currentUserId,
        angebote: chat.angebot.id
      };

      const newBuchung = await Buchung.create(buchungData).fetch();

      // Nachricht in den Chat einfügen
      const content = `Eine neue Buchung wurde erstellt:\n- Preis: ${preis}€\n- Abholdatum: ${buchungVon}\n- Rückgabedatum: ${buchungBis}`;
      await Message.create({ content, sender: currentUserId, receiver: otherParticipant.id, chat: chat.id, buchung: newBuchung.id });

      return res.redirect(`/chat/${chat.id}`);
    } catch (err) {
      return res.serverError(err);
    }
  },

  confirmBooking: async function (req, res) {
    try {
      const buchungId = req.params.id;
      const buchung = await Buchung.updateOne({ id: buchungId }).set({ status: 'bestätigt' });
      if (!buchung) {
        return res.notFound('Buchung not found');
      }

      const chat = await Chat.findOne({ angebot: buchung.angebote }).populate('participants');
      const currentUserId = req.session.userId;
      const otherParticipant = chat.participants.find(p => p.id !== currentUserId);

      // Nachricht in den Chat einfügen
      const content = `Die Buchung wurde bestätigt:\n- Preis: ${buchung.preis}€\n- Abholdatum: ${buchung.buchungVon}\n- Rückgabedatum: ${buchung.buchungBis}`;
      await Message.create({ content, sender: currentUserId, receiver: otherParticipant.id, chat: chat.id });

      return res.redirect('back');
    } catch (err) {
      return res.serverError(err);
    }
  },

  declineBooking: async function (req, res) {
    try {
      const buchungId = req.params.id;
      const buchung = await Buchung.updateOne({ id: buchungId }).set({ status: 'storniert' });
      if (!buchung) {
        return res.notFound('Buchung not found');
      }

      const chat = await Chat.findOne({ angebot: buchung.angebote }).populate('participants');
      const currentUserId = req.session.userId;
      const otherParticipant = chat.participants.find(p => p.id !== currentUserId);

      // Nachricht in den Chat einfügen
      const content = `Die Buchung wurde abgelehnt:\n- Preis: ${buchung.preis}€\n- Abholdatum: ${buchung.buchungVon}\n- Rückgabedatum: ${buchung.buchungBis}`;
      await Message.create({ content, sender: currentUserId, receiver: otherParticipant.id, chat: chat.id });

      return res.redirect('back');
    } catch (err) {
      return res.serverError(err);
    }
  },
};
