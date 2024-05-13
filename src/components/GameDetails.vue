<template>
  <div class="gameDetails" v-show="showDetails" data-testid="details">
    <p>
      <strong>Note</strong>: This is an advanced version of Tic-tac-toe. The description of this
      assignment was published in
      <a href="https://www.greatfrontend.com/" target="_blank" rel="noopener noreferrer">
        Greatfrontend </a
      >platform.
    </p>
    <p>
      Tic-tac-toe is a game for two players who take turns making space in a three-by-three grid
      with X or O. The player who succeeds in playing three of their marks in a horizontal,
      vertical, or diagonal row is the winner. Source:
      <a href="https://en.wikipedia.org/wiki/Tic-tac-toe" target="_blank" rel="noopener noreferrer"
        >Wikipedia</a
      >
    </p>
    <p>
      Traditionally, tic-tac-toe uses a 3 x 3 grid. In this problem, an advanced version of a
      tic-tac-toe game is built where the grid has {{ N }} x {{ N }} cells on the board and needs
      {{ M }} marks in a horizontal, vertical, or diagonal row to win.
    </p>
    <p>
      You can change these parameters by adding to the url parameters
      <span class="highlight-text">?N=4&M=3</span> where <span class="highlight-text">N >= M</span>.
      <router-link to="/?N=4&M=4">Try it!</router-link>
    </p>
    <p>
      The code is available
      <a
        href="https://github.com/myapos/tic-tac-toe/tree/master"
        target="_blank"
        rel="noopener noreferrer"
        >here</a
      >.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'GameDetails',
  props: {
    N: {
      type: Number,
      required: true
    },
    M: {
      type: Number,
      required: true
    },
    showDetails: {
      type: Boolean,
      required: true
    }
  }
})
</script>

<style scoped>
.gameDetails {
  font-size: 0.8rem;
  color: var(--vt-c-text-dark-2);
  padding: 5px;
  text-align: center;
  max-width: 500px;
  text-align: left;
}

.gameDetails p {
  padding: 5px;
}
</style>
