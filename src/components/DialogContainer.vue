<template>
  <v-dialog
    v-model="dialog"
    content-class="bottom-dialog"
    max-height="80vh"
    :max-width="'92%'"
    persistent
    scrollable
    transition="dialog-bottom-transition"
    :width="mdAndUp ? '720px' : '100%'"
  >
    <v-card
      min-height="300"
      rounded="lg"
    >
      <v-card-title class="box-shadow d-flex align-center ml-n3">
        <!-- <a role="button" :style="$attrs.style" @click="closeDialog()">
          <v-icon v-bind="$attrs" color="primary" icon="mdi-chevron-left" size="large" />
        </a>

        <div :key="$route.path" class="text-body-1 font-weight-bold">{{ dialogTitle }}</div> -->
        <a class="ml-auto" role="button" :style="$attrs.style" @click="closeDialog()">
          <v-icon v-bind="$attrs" icon="mdi-close" size="small" />
        </a>
      </v-card-title>
      <v-card-text>
        <slot /> <!-- Slot for dynamic content -->
      </v-card-text>
      <v-card-actions v-if="!hideActions">
        <v-btn
          class="v-col text-grey box-shadow"
          color="white"
          rounded="0"
          variant="elevated"
          @click="closeDialog"
        >
          {{ closeBtn }}
        </v-btn>
        <v-btn
          class="v-col box-shadow"
          color="primary"
          rounded="0"
          variant="elevated"
          @click="save"
        >
          {{ saveBtn }}
        </v-btn>
      </v-card-actions>
      <v-card-actions v-if="dangerAction">
        <v-btn
          class="v-col text-white box-shadow"
          color="red-lighten-1"
          rounded="0"
          variant="elevated"
          @click="danger"
        >
          {{ dangerBtn }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { useDisplay } from 'vuetify';
  export default {
    props: {
      closeBtn: {
        type: String,
        default: 'Close',
      },
      saveBtn: {
        type: String,
        default: 'Save',
      },
      dangerBtn: {
        type: String,
        default: 'Hapus',
      },
      dialogTitle: {
        type: String,
        default: 'Dialog Title',
      },
      value: {
        type: Boolean,
        default: false,
      },
      hideActions: {
        type: Boolean,
        default: false,
      },
      dangerAction: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['input', 'close', 'save', 'danger'],
    setup () {
      // Destructure only the keys we want to use
      const { xs, mdAndUp } = useDisplay();

      return { xs, mdAndUp }
    },
    data () {
      return {
        dialog: this.value,
      };
    },
    watch: {
      value (val) {
        this.dialog = val;
      },
      dialog (val) {
        this.$emit('input', val);
      },
    },
    methods: {
      closeDialog () {
        this.dialog = false;
        this.$emit('close');
      },
      save () {
        this.dialog = false;
        this.$emit('save');
      },
      danger () {
        this.dialog = false;
        this.$emit('danger');
      },
    },
  };
</script>
