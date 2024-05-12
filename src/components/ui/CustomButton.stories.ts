import type { Meta, StoryObj } from '@storybook/vue3'
import CustomButton from './CustomButton.vue'

// Define interface for component props
interface CustomButtonProps {
  onClick: () => void
  dataTestId?: string
}

const meta: Meta<typeof CustomButton> = {
  component: CustomButton
}

export default meta

export const Primary: StoryObj<CustomButtonProps> = {
  render: (args) => ({
    components: { CustomButton },
    template: '<custom-button @click="onClick" :dataTestId="dataTestId">My Button</custom-button>',
    setup() {
      return { ...args }
    }
  }),
  args: {
    onClick: () => console.log('Button clicked'), // Default onClick function
    dataTestId: 'my-data-test-id'
  }
}
