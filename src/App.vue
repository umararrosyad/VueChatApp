<template>
  <v-app>
    <app-header />
    <Sidebar />
    <v-main>
      <!-- Di sinilah halaman seperti /chat, /home dll akan muncul -->
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
  import Header from '@/components/Header.vue'
  import Sidebar from '@/components/Sidebar.vue'

  export default {
    components: {
      'app-header': Header,
      Sidebar,
    },
    data () {
      return {
        users: [
          { id: 1, nickname: 'User1' },
          { id: 2, nickname: 'User2' },
        ],
        message: '',
      }
    },
    computed: {
      showFooter () {
        // Hanya tampilkan footer jika di halaman Chat
        return this.$route.name === 'chat'
      },
    },
    methods: {
      sendMessage () {
        if (this.message.trim()) {
          // logika kirim pesan
          this.message = ''
        }
      },
    },
  }
</script>
