<template>
  <v-card>
    <v-card-title class="text-h6 font-weight-bold">
      Create New Room
    </v-card-title>
    <v-card-text>
      <v-text-field
        v-model="roomName"
        dense
        label="Room Name"
        outlined
        required
      />
      <v-autocomplete
        v-model="selectedUserIds"
        chips
        clearable
        :disabled="loading"
        :error-messages="errors"
        item-title="nickname"
        item-value="id"
        :items="users"
        label="Select Users"
        :loading="loading"
        multiple
        placeholder="Select users to join"
      />
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn text @click="internalDialog = false">Cancel</v-btn>
      <v-btn color="primary" @click="createRoom">Create</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        users: [],
        roomName: '',
        selectedUserIds: [],
        creatorId: null,
        errors: [],
        loading: false,
      }
    },
    mounted () {
      const storedUser = JSON.parse(localStorage.getItem('selectedUser'))
      if (storedUser && storedUser.id) {
        this.creatorId = storedUser.id

        // Masukkan creator ke daftar selected ID
        this.selectedUserIds.push(this.creatorId)
      } else {
        this.errors = ['Pengguna tidak ditemukan.']
      }

      this.fetchUsers()
    },
    methods: {
      async fetchUsers () {
        this.loading = true
        try {
          const res = await this.$axios.get('/users')
          const allUsers = res.data

          // Kecualikan creator dari daftar pilihan
          this.users = allUsers.filter(u => u.id !== this.creatorId)
        } catch (err) {
          console.error('Gagal mengambil user:', err)
          this.errors = ['Gagal mengambil data user']
        } finally {
          this.loading = false
        }
      },

      async createRoom () {
        try {
          const response = await this.$axios.post('/rooms', {
            name: this.roomName,
            user_ids: this.selectedUserIds,
          })

          const newRoom = response.data
          if (newRoom && newRoom.id) {
            this.$emit('selesai-user')
          } else {
            throw new Error('Room ID tidak ditemukan dalam response')
          }
        } catch (err) {
          console.error(err)
          this.errors = ['Gagal membuat room']
        }
      },
    },
  }
</script>
