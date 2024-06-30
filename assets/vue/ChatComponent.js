// assets/vue/ChatComponent.js
export default {
    props: ['userId'],
    data() {
      return {
        chats: [],
        selectedReceiverId: null,
        selectedAngebotId: null,
        newMessage: '',
        messages: []
      };
    },
    created() {
      this.fetchChats();
    },
    methods: {
      fetchChats() {
        fetch('/chat')
          .then(response => response.json())
          .then(data => {
            this.chats = data;
          });
      },
      selectChat(receiverId, angebotId) {
        this.selectedReceiverId = receiverId;
        this.selectedAngebotId = angebotId;
        this.fetchMessages(receiverId, angebotId);
      },
      fetchMessages(receiverId, angebotId) {
        fetch(`/chat/${receiverId}/${angebotId}`)
          .then(response => response.json())
          .then(data => {
            this.messages = data;
          });
      },
      sendMessage() {
        fetch('/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            receiver: this.selectedReceiverId,
            message: this.newMessage,
            angebot: this.selectedAngebotId
          })
        })
        .then(response => response.json())
        .then(data => {
          this.messages.push(data);
          this.newMessage = '';
        });
      }
    },
    template: `
      <div>
        <div v-if="chats.length > 0">
          <div class="list-group">
            <a href="#" class="list-group-item list-group-item-action" 
               v-for="chat in chats" :key="chat.id" 
               @click="selectChat(chat.receiver.id, chat.angebot.id)">
              Chat mit {{ chat.receiver.name }} (Angebot: {{ chat.angebot.name }})
            </a>
          </div>
        </div>
        <div v-if="selectedReceiverId && selectedAngebotId">
          <div v-for="message in messages" :key="message.id" class="chat-message">
            <strong>{{ message.sender.name }}:</strong> {{ message.message }}
          </div>
          <div class="input-group mt-3">
            <input type="text" v-model="newMessage" class="form-control" placeholder="Nachricht eingeben">
            <div class="input-group-append">
              <button @click="sendMessage" class="btn btn-primary">Senden</button>
            </div>
          </div>
        </div>
      </div>
    `
  };