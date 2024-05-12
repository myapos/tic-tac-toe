<template>
  <div class="tic-tac-toe-container">
    <tic-tac-toe :N="N" :M="M"></tic-tac-toe>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import TicTacToe from './components/TicTacToe.vue'

export default defineComponent({
  name: 'App',
  components: {
    TicTacToe
  },
  data() {
    // Get the current URL
    const urlString = window.location.href

    // Create a new URL object with the URL string
    const url = new URL(urlString)

    // Get the search params from the URL object
    const searchParams = url.searchParams

    const NValue: string = searchParams.get('N') || '3'
    const MValue: string = searchParams.get('M') || '3'

    return {
      N: parseInt(NValue),
      M: parseInt(MValue)
    }
  }
})
</script>

<style scoped>
.tic-tac-toe-container {
  margin: 0 auto;
  width: 100%;
}
</style>
