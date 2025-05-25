<template>

  <v-container v-if="messages.length === 0" class="d-flex justify-center align-center text-center" fluid style="height: 100%;">
    <div class="d-flex flex-column align-center">
      <span class="text-h6 font-weight-bold">No messages to display.</span>
    </div>
  </v-container>
  <div v-else class="pa-4">
    <!-- Tampilkan daftar pesan -->
    <div class="mb-4 fill-height" style="overflow-y: auto;">
      <div v-for="msg in messages" :key="msg.id" class="mb-2">
        <!-- Pesan dari user lain (kiri) -->
        <div v-if="user.id != msg.user_id">
          <strong class="text-body-2 font-weight-bold">{{ msg.user_nickname }} :</strong>
          <v-sheet
            class="d-flex flex-column bg-white pa-2 rounded-lg shadow-sm mb-3 mr-auto"
            style="border: 2px solid white; width: fit-content; max-width: 75%; min-width: 10%;"
          >
            <span class="text-body-2">{{ msg.content }}</span>
          </v-sheet>
        </div>

        <div v-else>
          <strong class="d-flex justify-end text-body-2 font-weight-bold">: {{ msg.user_nickname }}</strong>
          <v-sheet
            class="d-flex flex-column align-start bg-primary pa-2 rounded-lg shadow-sm ml-auto"
            style="border: 2px solid white; width: fit-content; max-width: 75%; min-width: 10%;"
          >
            <span class="text-body-2">{{ msg.content }}</span>
          </v-sheet>
        </div>
        <!-- Pesan dari user sendiri (kanan) -->
      </div>
    </div>

  </div>
  <v-footer app class="d-flex align-center pa-2">
    <v-textarea
      v-model="message"
      auto-grow
      class="flex-grow-1 mb-n2 mt-2 px-2 border-0"
      clearable
      color="primary"
      max-rows="3"
      placeholder="Type a message..."
      rows="1"
      variant="outlined"
      @keyup.enter="sendMessage"
    >
      <template #append-inner>
        <v-btn
          class="ml-2"
          color="primary"
          icon
          size="small"
          @click="sendMessage"
        >
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </template>
    </v-textarea>
  </v-footer>
</template>

<script>
  import { createConsumer } from '@rails/actioncable';

  export default {
    props: ['id'], // room ID dari route
    data () {
      return {
        message: '',
        cable: null,
        channel: null,
        messages: [],
      };
    },
    computed: {
      user () {
        return JSON.parse(localStorage.getItem('selectedUser'));
      },
    },
    watch: {
      id (newId) {
        if (this.channel) {
          this.channel.unsubscribe();
        }
        this.fetchHistory();
        this.channel = this.cable.subscriptions.create(
          { channel: 'ChatChannel', room_id: newId },
          {
            received: data => {
              this.messages.push(data);
            },
          }
        );
      },
    },
    mounted () {
      const selectedUser = JSON.parse(localStorage.getItem('selectedUser'));
      if (!selectedUser) return;

      this.cable = createConsumer('/cable'); // sesuaikan URL jika production

      this.channel = this.cable.subscriptions.create(
        { channel: 'ChatChannel', room_id: this.id },
        {
          received: data => {
            this.messages.push(data);
          },
        }
      );

      this.fetchHistory();
    },
    beforeUnmount () {
      if (this.channel) {
        this.channel.unsubscribe();
      }
    },
    methods: {
      async fetchHistory () {
        try {
          const res = await this.$axios.get(`/rooms/${this.id}/messages`);
          this.messages = res.data;
        } catch (e) {
          console.error('Gagal ambil riwayat pesan:', e);
        }
      },
      // sendMessage () {
      //   const selectedUser = JSON.parse(localStorage.getItem('selectedUser'));
      //   if (!this.channel || !this.message.trim() || !selectedUser) return;

      //   this.channel.send({
      //     action: 'receive',
      //     user_id: selectedUser.id,
      //     content: this.message.trim(),
      //   });

      //   this.message = ''; // reset input setelah kirim
      // },
      async sendMessage () {
        const selectedUser = JSON.parse(localStorage.getItem('selectedUser'));
        console.log('sendMessage called', selectedUser.id, this.id, this.message);
        if (!selectedUser || !this.id ) return;

        try {
          const res = await this.$axios.post('/messages', {
            room_id: this.id,
            user_id: selectedUser.id,
            content: this.message.trim(),
          });

          // Jika server langsung broadcast ke ActionCable, maka tidak perlu tambah manual ke `this.messages`
          this.message = '';
        } catch (error) {
          console.error('Gagal mengirim pesan:', error);
        }
      },
    },
  };
</script>
