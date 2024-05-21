import type { Meta, StoryObj } from '@storybook/vue3'

import ExternalLink from './ExternalLink.vue'

// Define interface for component props
interface ExternalLinkProps {
  to: string
}

const meta: Meta<typeof ExternalLink> = {
  component: ExternalLink
}

export default meta

export const Primary: StoryObj<ExternalLinkProps> = {
  render: (args) => ({
    components: { ExternalLink },
    template: '<external-link :to="to" data-testid="test">My External Link</external-link>',
    setup() {
      return { ...args }
    }
  }),
  args: {
    to: 'https://github.com/myapos'
  }
}
