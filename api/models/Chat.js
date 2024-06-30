/**
 * Chat.js
 *
 * @description :: A model definition represents a chat message.
 */
// api/models/Chat.js
module.exports = {
  attributes: {
    message: {
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
    }
  }
};