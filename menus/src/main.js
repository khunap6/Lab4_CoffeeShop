import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import './style.css'

import CoffeeHeader from './components/CoffeeHeader.vue'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

// Global Component
app.component('CoffeeHeader', CoffeeHeader)

app.mount('#app')
