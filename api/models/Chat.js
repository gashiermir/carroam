/**
 * Chat.js
 *
 * @description :: A model definition represents a chat message.
 */
// api/models/Chat.js
// api/models/Chat.js
module.exports = {
  attributes: {
    participants: {
      collection: 'user',
      via: 'chats'
    },
    messages: {
      collection: 'message',
      via: 'chat'
    }
  }
};