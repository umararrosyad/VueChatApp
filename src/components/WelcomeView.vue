<template>
  <div class="fill-height d-flex flex-column justify-center align-center px-4">
    <span class="text-h6 font-weight-bold">Welcome, {{ nickname || 'Guest' }}!</span>
    <p>Enjoy your chat experience!</p>

    <v-row align="center" class="mt-8 w-100" dense justify="center">
      <v-col cols="12" sm="12">
        <v-btn block class="rounded-xl text-subtitle-1" color="primary" @click="$emit('go-to-create-user')">
          Create User
        </v-btn>
      </v-col>
      <v-col cols="12" sm="12">
        <v-btn block class="rounded-xl text-subtitle-1" color="white" @click="$emit('go-to-user-list')">
          User List
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    props: {
      nickname: {
        type: String,
        default: '',
      },
    },
    emits: ['go-to-create-user', 'go-to-user-list'],
  }
</script>
