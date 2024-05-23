// .storybook/preview.js
import { setup } from '@storybook/vue3'
import { createPinia } from 'pinia'

const pinia = createPinia()
import { Preview } from '@storybook/vue3'
import CustomButton from '../src/components/ui/CustomButton.vue'
import AppCheckbox from '../src/components/ui/AppCheckbox.vue'
import AppRadio from '../src/components/ui/AppRadio.vue'
import ExternalLink from '../src/components/ui/ExternalLink.vue'
import AppFieldset from '../src/components/ui/AppFieldset.vue'

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
  app.component('ExternalLink', ExternalLink)
  app.component('AppFieldset', AppFieldset)
  app.use(pinia)
})

export default preview
