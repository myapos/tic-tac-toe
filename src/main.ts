import { createPinia } from 'pinia'
import { createApp } from 'vue'

import './assets/main.css'

import App from './App.vue'
import AppCheckbox from './components/ui/AppCheckbox.vue'
import AppFieldset from './components/ui/AppFieldset.vue'
import AppRadio from './components/ui/AppRadio.vue'
import CustomButton from './components/ui/CustomButton.vue'
import ExternalLink from './components/ui/ExternalLink.vue'
import router from './router/router'

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)

app.component('CustomButton', CustomButton)
app.component('AppCheckbox', AppCheckbox)
app.component('AppRadio', AppRadio)
app.component('ExternalLink', ExternalLink)
app.component('AppFieldset', AppFieldset)

app.mount('#app')
