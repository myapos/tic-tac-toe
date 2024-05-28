import type { Meta, StoryObj } from '@storybook/vue3'

import AppSelect from './AppSelect.vue'

// Define interface for component props
interface AppSelectProps {
  id: string
  name: string
  labelText: string
  options: Object
}

const options = {
  EASY: 'Easy',
  MEDIUM: 'Medium',
  HARD: 'Hard'
}

const meta: Meta<typeof AppSelect> = {
  component: AppSelect
}

export default meta

export const WithLabel: StoryObj<AppSelectProps> = {
  render: (args) => ({
    components: { AppSelect },
    template: '<app-select :id="id" :labelText="labelText" :options="options"/>',
    setup() {
      return { ...args }
    }
  }),
  args: {
    name: 'my_select',
    id: 'my_select',
    labelText: 'My label',
    options
  }
}

export const WithoutLabel: StoryObj<AppSelectProps> = {
  render: (args) => ({
    components: { AppSelect },
    template: '<app-select :id="id" :options="options"/>',
    setup() {
      return { ...args }
    }
  }),
  args: {
    name: 'my_select',
    id: 'my_select',
    options
  }
}
