<template>
  <div>
    <WelcomeView
      v-if="view === 'welcome'"
      :nickname="nickname"
      @go-to-create-user="view = 'create'"
      @go-to-user-list="view = 'list'"
    />
    <CreateUserForm
      v-if="view === 'create'"
      @submit="handleCreateUser"
    />
    <UserList
      v-if="view === 'list'"
      :users="users"
      @select-user="handleSelectUser"
    />
  </div>
</template>

<script>
  import WelcomeView from './WelcomeView.vue'
  import CreateUserForm from './CreateUserForm.vue'
  import UserList from './UserList.vue'

  export default {
    components: {
      WelcomeView,
      CreateUserForm,
      UserList,
    },
    emits: ['close'],
    data () {
      return {
        view: 'welcome',
        nickname: '',
        users: [], // isikan dari API atau lokal
      };
    },
    methods: {
      handleCreateUser (nickname) {
        this.nickname = nickname;
        this.view = 'welcome';
      },
      handleSelectUser (user) {
        this.nickname = user.nickname;
        this.$emit('close'); // atau lanjutkan proses
      },
    },
  }
</script>
