module.exports = async function (req, res, proceed) {
    const userId = req.session.userId;
    const chatId = req.params.id;
  
    if (!userId || !chatId) {
      return res.forbidden('You are not allowed to access this resource.');
    }
  
    try {
      const chat = await Chat.findOne({ id: chatId }).populate('participants');
  
      if (!chat) {
        return res.notFound('Chat not found');
      }
  
      const isParticipant = chat.participants.some(p => p.id === userId);
  
      if (!isParticipant) {
        return res.forbidden('You are not allowed to access this chat.');
      }
  
      return proceed();
    } catch (err) {
      return res.serverError(err);
    }
  };
  