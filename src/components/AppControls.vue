<template>
  <div class="controls"><slot></slot></div>
</template>
<script lang="ts">
export default {
  name: 'AppControls'
}
</script>
<style scoped>
.controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
