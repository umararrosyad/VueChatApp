<!-- <template>
  <v-footer class="pa-3" height="auto">
    <v-text-field
      v-model="message"
      clearable
      label="Ketik pesan..."
      outlined
      @keyup.enter="submitMessage"
    />
    <v-btn :disabled="!message" @click="submitMessage">Kirim</v-btn>
  </v-footer>
</template>

<script>
  export default {
    emits: ['send-message'],
    data () {
      return {
        message: '',
      }
    },
    methods: {
      submitMessage () {
        if (!this.message.trim()) return
        this.$emit('send-message', this.message.trim())
        this.message = ''
      },
    },
  }
</script> -->
