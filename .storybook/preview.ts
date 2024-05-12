// .storybook/preview.js
import { setup } from '@storybook/vue3'
import { defineComponent } from 'vue'
import { Preview } from '@storybook/vue3'
import CustomButton from '../src/components/ui/CustomButton.vue'

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
})

export default preview
