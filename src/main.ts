import './assets/main.css'

import { createApp } from 'vue'
import router from './router/router'
import App from './App.vue'
import CustomButton from './components/ui/CustomButton.vue'

const app = createApp(App)
app.use(router)

app.component('CustomButton', CustomButton)

app.mount('#app')
