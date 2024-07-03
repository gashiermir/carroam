// api/models/Message.js
module.exports = {
    attributes: {
      content: {
        type: 'string',
        required: true
      },
      sender: {
        model: 'user',
        required: true
      },
      receiver: {
        model: 'user',
        required: true
      },
      chat: {
        model: 'chat',
        required: true
      }
    }
  };