<template>
  <v-navigation-drawer v-model="layout.drawer" app :temporary="false">
    <v-list class="d-flex flex-column fill-height pa-0">
      <!-- Daftar Room -->
      <div v-for="room in rooms" :key="room.id">
        <v-list-item
          link
          :to="`/room/${room.id}`"
        >
          <div class="d-flex justify-space-between align-center text-subtitle-1 font-weight-bold">
            <span>{{ room.name }}</span>
          </div>
        </v-list-item>
        <v-divider class="border-opacity-25" />
      </div>
      <v-spacer />
      <div v-if="selectedUser" class="pa-4">
        <v-btn block class="text-subtitle-2 py-6 mb-2 font-weight-bold" color="primary" @click="showCreateDialog = true">
          + Create Room
        </v-btn>
      </div>
    </v-list>
  </v-navigation-drawer>

  <DialogContainer
    v-model="showCreateDialog"
    dialog-title="Register Nickname"
    :hide-actions="true"
    @close="showCreateDialog = false"
    @save=""
  >
    <CreateRoomDialog
      @room-created="rooms.unshift($event)"
      @selesai-user="fetchUserRooms(); showCreateDialog = false"
    />
  </DialogContainer>
</template>

<script>
  import { useLayoutStore } from '@/stores/useLayoutStore'

  export default {
    data () {
      return {
        rooms: [],
        showCreateDialog: false,
      }
    },
    computed: {
      layout () {
        return useLayoutStore()
      },
      selectedUser () {
        return JSON.parse(localStorage.getItem('selectedUser'))
      },
    },
    mounted () {
      this.fetchUserRooms()
    },
    methods: {
      async fetchUserRooms () {
        try {
          if (!this.selectedUser || !this.selectedUser.id) return

          const response = await this.$axios.get('/rooms', {
            params: { user_id: this.selectedUser.id },
          })
          this.rooms = response.data
        } catch (error) {
          console.error('Gagal mengambil data rooms user:', error)
        }
      },
    },
  }
</script>
