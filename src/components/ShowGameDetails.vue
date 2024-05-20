<template>
  <custom-button @click="toggleDetails" dataTestId="toggle-details-btn">{{
    gameDetailsBtnText
  }}</custom-button>
</template>
<script lang="ts">
import { mapActions, mapState } from 'pinia'

import { useGameStore } from '@/stores/gameStore'

export default {
  name: 'ShowGameDetails',
  computed: {
    ...mapState(useGameStore, ['showDetails']),
    gameDetailsBtnText() {
      if (this.showDetails) {
        return 'Hide game details'
      }
      return 'Show game details'
    }
  },
  methods: {
    ...mapActions(useGameStore, ['toggleDetails'])
  }
}
</script>
