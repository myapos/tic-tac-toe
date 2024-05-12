import type { Meta, StoryObj } from '@storybook/vue3'
import TicTacToe from './TicTacToe.vue'

// Define interface for component props
interface TicTacToeProps {
  N: number
  M: number
}

const meta: Meta<typeof TicTacToe> = {
  component: TicTacToe
}

export default meta

export const Primary: StoryObj<TicTacToeProps> = {
  render: (args) => ({
    components: { TicTacToe },
    template: '<tic-tac-toe :N="N" :M="M"></tic-tac-toe>',
    setup() {
      return { ...args }
    }
  }),
  args: {
    N: 3,
    M: 3
  }
}
