/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

import axios from './lib/axios'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Styles
import 'unfonts.css'

const app = createApp(App)

app.config.globalProperties.$axios = axios

registerPlugins(app)
app.use(createPinia())
app.mount('#app')
