<template>
  <div class="controls" data-testid="controls"><slot></slot></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppControls'
})
</script>
<style scoped>
.controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
