<template>
  <v-app>
    <app-header :nickname="nickname" />

    <v-row>
      <v-col cols="3">
        <sidebar :users="users" />
      </v-col>
      <v-col cols="9">
        <div class="chat-window">
          <p>Chat window for {{ nickname }}</p>
        </div>
      </v-col>
    </v-row>

    <!-- <app-footer @send-message="sendMessage" /> -->
  </v-app>
</template>

<script>
  import Header from './Header.vue'
  import Sidebar from './Sidebar.vue'

  export default {
    components: { 'app-header': Header, 'sidebar': Sidebar },

    data () {
      return {
        nickname: localStorage.getItem('nickname') || '',
        users: [
          { id: 1, nickname: 'Alice' },
          { id: 2, nickname: 'Bob' },
          { id: 3, nickname: localStorage.getItem('nickname') || '' },
        ],
      }
    },

    methods: {
      sendMessage (message) {
        console.log('Send message:', message)
      // nanti integrasi WebSocket di sini
      },
    },
  }
</script>

<style>
.chat-window {
  height: 400px;
  border: 1px solid #ccc;
  padding: 1rem;
  overflow-y: auto;
}
</style>
