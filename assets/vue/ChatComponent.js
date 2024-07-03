export default {
  props: ['chatId', 'initialMessages', 'session'],
  template: `
    <div>
      <div class="message-container">
        <div v-for="message in messages" :key="message.id" :class="['message', message.sender.id === session.userId ? 'sent' : 'received']">
          <strong>{{ message.sender.vorname }} {{ message.sender.nachname }}:</strong>
          <p>{{ message.content }}</p>
        </div>
      </div>
      <form @submit.prevent="sendMessage" class="chat-input">
        <textarea v-model="newMessage" class="form-control" rows="1" placeholder="Nachricht schreiben..." required></textarea>
        <button type="submit" class="btn btn-primary">Senden</button>
      </form>
    </div>
  `,
  data() {
    return {
      messages: this.initialMessages,
      newMessage: '',
    };
  },
  methods: {
    async sendMessage() {
      try {
        const response = await fetch('/message/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            chatId: this.chatId,
            content: this.newMessage
          })
        });
        const data = await response.json();
        this.messages.push(data);
        this.newMessage = '';
      } catch (err) {
        console.error('Error sending message:', err);
      }
    }
  }
};