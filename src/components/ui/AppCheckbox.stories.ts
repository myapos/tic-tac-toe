import type { Meta, StoryObj } from '@storybook/vue3'

import AppCheckbox from './AppCheckbox.vue'

// Define interface for component props
interface AppCheckboxProps {
  id: string
  name: string
  labelText: string
  checked: boolean
}

const meta: Meta<typeof AppCheckbox> = {
  component: AppCheckbox
}

export default meta

export const IsChecked: StoryObj<AppCheckboxProps> = {
  render: (args) => ({
    components: { AppCheckbox },
    template: '<app-checkbox :name="name" :id="id" :labelText="labelText" :checked="checked"/>',
    setup() {
      return { ...args }
    }
  }),
  args: {
    name: 'my_checkbox',
    id: 'my_checkbox',
    labelText: 'My label',
    checked: true
  }
}

export const IsUnChecked: StoryObj<AppCheckboxProps> = {
  render: (args) => ({
    components: { AppCheckbox },
    template: '<app-radio :name="name" :id="id" :labelText="labelText" :checked="checked"/>',
    setup() {
      return { ...args }
    }
  }),
  args: {
    name: 'my_checkbox',
    id: 'my_checkbox',
    labelText: 'My label',
    checked: false
  }
}
