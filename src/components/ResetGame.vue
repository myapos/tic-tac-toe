<template>
  <custom-button :onClick="onReset" dataTestId="reset-btn" :shouldFocus="shouldFocusReset"
    >Reset Game</custom-button
  >
</template>

<script lang="ts">
import { mapState } from 'pinia'
import { defineComponent } from 'vue'

import { useGameStore } from '@/stores/gameStore'
export default defineComponent({
  props: {
    onReset: {
      type: Function,
      required: true
    }
  },
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
  }
})
</script>
