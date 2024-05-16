import './assets/main.css'

import { createApp } from 'vue'

import App from './App.vue'
import AppCheckbox from './components/ui/AppCheckbox.vue'
import AppRadio from './components/ui/AppRadio.vue'
import CustomButton from './components/ui/CustomButton.vue'
import router from './router/router'

const app = createApp(App)
app.use(router)

app.component('CustomButton', CustomButton)
app.component('AppCheckbox', AppCheckbox)
app.component('AppRadio', AppRadio)

app.mount('#app')
