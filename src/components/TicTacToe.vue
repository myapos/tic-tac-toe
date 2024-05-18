<template>
  <div
    v-if="hasValidDimensionProps()"
    class="tic-tac-toe-wrapper"
    data-testid="tic-tac-toe-wrapper"
  >
    <get-feedback :M="M"></get-feedback>
    <display-grid @click-cell="handleClickCell" />
    <app-controls>
      <div class="row">
        <reset-game :onReset="handleReset"></reset-game>
        <show-game-details />
        <load-default-grid />
        <player-modes />
        <transition name="fade-in-out">
          <algo-modes />
        </transition>
      </div>
      <transition name="fade-in-out">
        <game-details :N="N" :M="M" />
      </transition>
    </app-controls>
    <footer>
      Implemented with <a href="https://vuejs.org/" target="_blank">Vue 3</a> by
      <a href="https://github.com/myapos" target="_blank">Myron Apostolakis</a>@2024
    </footer>
  </div>
  <div v-else data-testid="not-valid-params" class="not-valid-params">
    Not valid N,M parameters <load-default-grid />
  </div>
</template>

<script setup lang="ts">
import AlgoModes from './AlgoModes.vue'
import AppControls from './AppControls.vue'
import DisplayGrid from './DisplayGrid.vue'
import GameDetails from './GameDetails.vue'
import GetFeedback from './GetFeedback.vue'
import LoadDefaultGrid from './LoadDefaultGrid.vue'
import PlayerModes from './PlayerModes.vue'
import ResetGame from './ResetGame.vue'
import ShowGameDetails from './ShowGameDetails.vue'
import { useGameLogic } from './useGameLogic'
import { usePreventRouteLeave } from './usePreventRouteLeave'

const gridDimensions = defineProps({
  N: { type: Number, required: true },
  M: { type: Number, required: true }
})

const { handleClickCell, handleReset, hasValidDimensionProps } = useGameLogic(gridDimensions)

usePreventRouteLeave()
</script>

<style scoped>
.tic-tac-toe-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
  align-items: center;
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr 100px;
  gap: 1rem;
  align-items: start;
  justify-items: stretch;
}
.fade-in-out-enter-active,
.fade-in-out-leave-active {
  transition: opacity 1s ease;
}

.fade-in-out-enter-from,
.fade-in-out-leave-to {
  opacity: 0;
}

.not-valid-params {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

footer {
  font-size: 0.9rem;
  position: fixed;
  bottom: 0;
}
</style>
