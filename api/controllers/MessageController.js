module.exports = {
    new: async function (req, res) {
      let users = await User.find();
      res.view('pages/message/new', { users });
    },
  
    create: async function (req, res) {
        try {
          const { content, chatId } = req.body;
          await Message.create({ content, sender: req.session.userId, chat: chatId });
          return res.redirect(`/chat/${chatId}`);
        } catch (err) {
          return res.serverError(err);
        }
      },
  
    find: async function (req, res) {
      let messages;
      if (req.query.q && req.query.q.length > 0) {
        messages = await Message.find({
          content: {
            'contains': req.query.q
          }
        }).populate('sender').populate('receiver');
      } else {
        messages = await Message.find().populate('sender').populate('receiver');
      }
      res.view('pages/message/index', { messages: messages });
    },
  
    findOne: async function (req, res) {
      let message = await Message.findOne({ id: req.params.id }).populate('sender').populate('receiver');
      res.view('pages/message/show', { message: message });
    },
    
    edit: async function (req, res) {
      let message = await Message.findOne({ id: req.params.id });
      let users = await User.find();
      res.view('pages/message/edit', { message: message, users });
    },
  
    destroy: async function (req, res) {
      await Message.destroyOne({ id: req.params.id });
      res.redirect('/message');
    },
  
    update: async function (req, res) {
      let params = req.allParams();
      await Message.updateOne({ id: req.params.id }).set(params);
      res.redirect('/message');
    }
  };