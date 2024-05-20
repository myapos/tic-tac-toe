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
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  align-items: end;
  justify-items: stretch;
}

@media screen and (max-width: 1200px) {
  .controls {
    max-width: 300px;
  }
}
</style>
