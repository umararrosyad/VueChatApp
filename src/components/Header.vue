<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>
      <div class="d-flex align-center justify-space-between mr-5">
        <div class="d-flex align-center">
          <v-icon
            class="mr-2"
            icon="mdi-menu"
            size="x-large"
            @click="toggleDrawer"
          />
          <span class="text-h6 font-weight-bold"> ChatApp </span>
        </div>
        <!-- Jika nickname tersedia, tampilkan v-menu -->
        <v-menu v-if="nickname" offset-y>
          <template #activator="{ props }">
            <div
              class="d-flex align-center border-md rounded-lg px-0 py-0 bg-secondary"
              v-bind="props"
            >
              <v-avatar icon="mdi-account-circle" size="40" />
              <span class="text-h6 font-weight-bold mr-2">{{ nickname }}</span>
            </div>
          </template>
          <v-list>
            <v-list-item @click="logout">
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <!-- Jika tidak ada nickname (Guest), tampilkan klik buka dialog -->
        <div
          v-else
          class="d-flex align-center border-md rounded-lg px-0 py-0 bg-red-lighten-1"
          @click="showWelcomeDialog = true"
        >
          <v-avatar icon="mdi-account-circle" size="40" />
          <span class="text-h6 font-weight-bold mr-2">Guest</span>
        </div>
      </div>
    </v-toolbar-title>
  </v-app-bar>
  <DialogContainer
    v-model="showWelcomeDialog"
    dialog-title="Register Nickname"
    :hide-actions="true"
    @close="showWelcomeDialog = false"
    @save=""
  >
    <WelcomeContent :nickname="nickname || 'Guest'" />
  </DialogContainer>
</template>

<script>
  import DialogContainer from '@/components/DialogContainer.vue';
  import WelcomeContent from '@/components/WelcomeContent.vue';
  import { useLayoutStore } from '@/stores/useLayoutStore';

  export default {
    components: {
      DialogContainer,
      WelcomeContent,
    },
    data () {
      return {
        showWelcomeDialog: false,
        selectedUser: null,
      };
    },
    computed: {
      nickname () {
        return this.selectedUser?.nickname || null;
      },
      userId () {
        return this.selectedUser?.id || null;
      },
    },
    created () {
      const stored = localStorage.getItem('selectedUser');
      if (stored) {
        try {
          this.selectedUser = JSON.parse(stored);
        } catch (e) {
          console.error('Gagal parsing selectedUser dari localStorage:', e);
        }
      }else {
        this.showWelcomeDialog = true;
        const layout = useLayoutStore();
        layout.closeDrawer();
      }
    },
    methods: {
      toggleDrawer () {
        const stored = localStorage.getItem('selectedUser');
        if (stored) {
          const layout = useLayoutStore();
          layout.toggleDrawer();
        }
      },
      logout () {
        localStorage.removeItem('selectedUser');
        this.$router.go(0);
      },
    },
  };
</script>
