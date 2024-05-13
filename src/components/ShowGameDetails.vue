<template>
  <custom-button @click="toggleDetails" dataTestId="toggle-details-btn"
    >Show game details</custom-button
  >
</template>
<script lang="ts">
export default {
  name: 'ShowGameDetails',
  props: {
    toggleDetails: { type: Function, required: true }
  }
}
</script>
