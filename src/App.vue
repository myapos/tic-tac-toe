<template>
  <div class="tic-tac-toe-container">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style scoped>
.tic-tac-toe-container {
  margin: 0 auto;
  width: 100%;
}
</style>
