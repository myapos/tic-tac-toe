<template>
  <div data-testid="feedback" class="feeedback">{{ feedback }}</div>
</template>

<script lang="ts">
import { mapState } from 'pinia'
import { defineComponent } from 'vue'

import { useGameStore } from '@/stores/gameStore'

export default defineComponent({
  props: {
    M: {
      type: Number
    }
  },
  name: 'GetFeedback',

  computed: {
    ...mapState(useGameStore, ['feedback'])
  }
})
</script>

<style scoped>
.feeedback {
  font-size: 0.8rem;
  color: var(--vt-c-text-dark-2);
  border: 0;
  padding: 0.5rem;
  border-radius: 5px;
  min-width: 250px;
  text-align: center;
}
</style>
