<template>
  <custom-button @click="toggleDetails" dataTestId="toggle-details-btn"
    >Show game details</custom-button
  >
</template>
<script lang="ts">
import { mapActions } from 'pinia'

import { useGameStore } from '@/stores/gameStore'

export default {
  name: 'ShowGameDetails',
  methods: {
    ...mapActions(useGameStore, ['toggleDetails'])
  }
}
</script>
