<template>
  <div class="tic-tac-toe-container">
    <tic-tac-toe :N="3" :M="3"></tic-tac-toe>
  </div>
</template>

<script lang="ts">
import TicTacToe from './components/TicTacToe.vue'

export default {
  name: 'App',
  components: {
    TicTacToe
  }
}
</script>

<style scoped>
.tic-tac-toe-container {
  margin: 0 auto;
  width: 100%;
}
</style>
