<template>
  <custom-button :onClick="handleReset" dataTestId="reset-btn" :shouldFocus="shouldFocusReset"
    >Reset Game</custom-button
  >
</template>

<script lang="ts">
import { mapState, mapActions } from 'pinia'
import { defineComponent } from 'vue'

import { useGameStore } from '@/stores/gameStore'
export default defineComponent({
  name: 'ResetGame',
  computed: {
    ...mapState(useGameStore, [
      'isInSinglePlayerMode',
      'isInAutoPlayerMode',
      'isInTwoPlayerMode',
      'gameEnded'
    ]),
    shouldFocusReset() {
      return (this.isInSinglePlayerMode || this.isInTwoPlayerMode) && this.gameEnded
    }
  },
  methods: {
    ...mapActions(useGameStore, ['handleReset'])
  }
})
</script>
