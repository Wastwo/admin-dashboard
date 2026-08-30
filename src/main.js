/**
 * @module main
 * @description Application entry point. Bootstraps the Vue 3 app, installs
 * the router plugin, and mounts to the DOM.
 */
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

/** @type {import('vue').App} */
const app = createApp(App)

app.use(router)

app.mount('#app')
