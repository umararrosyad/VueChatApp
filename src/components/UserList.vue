<template>
  <div class="fill-height filled d-flex flex-column justify-center my-2">
    <span class="text-h6 font-weight-bold mb-2">Search User</span>
    <v-autocomplete
      v-model="searchQuery"
      clearable
      hide-details
      hide-no-data
      item-title="nickname"
      item-value="id"
      :items="users"
      placeholder="Search by nickname"
      solo
      @change="onSelectUser"
      @update:search="onSearchInput"
    />
    <v-btn
      block
      class="mt-4"
      color="primary"
      type="button"
      @click="onSubmit"
    >
      Submit
    </v-btn>
  </div>
</template>

<script>
  import debounce from 'lodash/debounce'

  export default {
    emits: ['select-user'],
    data () {
      return {
        users: [],
        searchQuery: '',
      }
    },
    watch: {
      searchQuery (val) {
        if (!val) {
          this.fetchUsers()
        }
      },
    },
    mounted () {
      this.fetchUsers()
    },
    methods: {
      async fetchUsers (query = '') {
        try {
          const response = await this.$axios.get('/users', {
            params: { q: query },
          })
          this.users = response.data
          console.log('Users fetched:', response)
        } catch (error) {
          console.error('Gagal mengambil users:', error)
        }
      },
      onSelectUser (userId) {
        const user = this.users.find(u => u.id === userId)
        if (user) this.$emit('select-user', user)
      },
      onSearchInput: debounce(function (val) {
        if (val && val.length >= 1) {
          this.fetchUsers(val)
        }
      }, 500),
      onSubmit () {
        if (!this.searchQuery) {
          alert('Please select a user before submitting.')
          return
        }
        // cari objek user dari users array sesuai id yang dipilih
        const selectedUser = this.users.find(u => u.id === this.searchQuery)
        if (!selectedUser) {
          alert('Selected user not found.')
          return
        }

        // simpan ke localStorage
        localStorage.setItem('selectedUser', JSON.stringify(selectedUser))

        // reload halaman
        window.location.reload()
      },
    },
  }
</script>
