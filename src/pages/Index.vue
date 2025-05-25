<template>
  <v-container class="fill-height" fluid>
    <v-text-field v-model="nickname" label="Nickname" />
    <v-btn @click="masuk">Enter Chat</v-btn>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        nickname: '',
      }
    },
    methods: {
      async masuk () {
        try {
          const res = await this.$axios.post('/users', {
            nickname: this.nickname ,
          })

          const user = res.data
          localStorage.setItem('user', user)

          this.$router.push('/chat')
        } catch (error) {
          console.error('Gagal membuat user:', error)
        }
      },

      goChat () {
        if (this.nickname.trim()) {
          localStorage.setItem('nickname', this.nickname)
          this.$router.push('/chat')
        } else {
          alert('Please enter a nickname')
        }
      },
    },
  }
</script>
