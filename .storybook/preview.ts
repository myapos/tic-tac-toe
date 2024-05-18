// .storybook/preview.js
import { setup } from '@storybook/vue3'
import { createPinia } from 'pinia'

const pinia = createPinia()
import { Preview } from '@storybook/vue3'
import CustomButton from '../src/components/ui/CustomButton.vue'
import AppCheckbox from '../src/components/ui/AppCheckbox.vue'
import AppRadio from '../src/components/ui/AppRadio.vue'

import '../src/assets/main.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

setup((app) => {
  app.component('CustomButton', CustomButton)
  app.component('AppCheckbox', AppCheckbox)
  app.component('AppRadio', AppRadio)
  app.use(pinia)
})

export default preview
