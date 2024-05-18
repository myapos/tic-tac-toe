import type { Meta, StoryObj } from '@storybook/vue3'

import AppRadio from './AppRadio.vue'

// Define interface for component props
interface AppRadioProps {
  id: string
  name: string
  labelText: string
  value: string
  checked: boolean
}

const meta: Meta<typeof AppRadio> = {
  component: AppRadio
}

export default meta

export const IsChecked: StoryObj<AppRadioProps> = {
  render: (args) => ({
    components: { AppRadio },
    template: '<app-radio :name="name" :id="id" :labelText="labelText" :checked="checked"/>',
    setup() {
      return { ...args }
    }
  }),
  args: {
    name: 'my_radio_btn',
    id: 'my_radio_btn',
    labelText: 'My label',
    checked: true
  }
}

export const IsUnChecked: StoryObj<AppRadioProps> = {
  render: (args) => ({
    components: { AppRadio },
    template: '<app-radio :name="name" :id="id" :labelText="labelText" :checked="checked"/>',
    setup() {
      return { ...args }
    }
  }),
  args: {
    name: 'my_radio_btn',
    id: 'my_radio_btn',
    labelText: 'My label',
    checked: false
  }
}
