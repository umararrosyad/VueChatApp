<template>
  <v-form @submit.prevent="submitForm">
    <span class="text-h6 font-weight-bold">Register Nickname</span>
    <v-text-field
      v-model="nickname"
      :error-messages="errors"
      placeholder="Enter Nickname"
      required
    />
    <v-btn block class="mt-1" color="primary" type="submit">Submit</v-btn>
  </v-form>
</template>

<script>
  export default {
    emits: ['submit'],
    data () {
      return {
        nickname: '',
        errors: [],
      };
    },
    methods: {
      async submitForm () {
        this.errors = []

        if (!this.nickname.trim()) {
          this.errors = ['Nickname is required']
          return
        }

        try {
          const response = await this.$axios.post('/users', {
            nickname: this.nickname.trim(),
          })

          const user = response.data
          localStorage.setItem('selectedUser', JSON.stringify(user))
          window.location.reload()
        } catch (error) {
          if (error.response?.data?.errors) {
            // Kalau API mengirim errors array
            this.errors = error.response.data.errors
          } else {
            // Fallback error message
            this.errors = ['Failed to register user. Please try again.']
          }
        }
      },
    },
  }
</script>
