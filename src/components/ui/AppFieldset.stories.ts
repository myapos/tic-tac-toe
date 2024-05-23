import type { Meta, StoryObj } from '@storybook/vue3'

import AppFieldset from './AppFieldset.vue'

// Define interface for component props
interface AppFieldsetProps {
  id: string
}

const meta: Meta<typeof AppFieldset> = {
  component: AppFieldset
}

export default meta

export const Primary: StoryObj<AppFieldsetProps> = {
  render: (args) => ({
    components: { AppFieldset },
    template: '<app-fieldset :id="id">My fieldset content</app-fieldset>',
    setup() {
      return { ...args }
    }
  }),
  args: {
    id: 'my-fieldset-id'
  }
}
