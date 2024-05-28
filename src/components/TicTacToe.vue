<template>
  <div
    v-if="hasValidDimensionProps()"
    class="tic-tac-toe-wrapper"
    data-testid="tic-tac-toe-wrapper"
  >
    <get-feedback />
    <display-grid @click-cell="handleClickCell" />
    <app-controls>
      <player-modes />
      <reset-game />
      <difficulty-level />
      <transition name="fade-in-out">
        <algo-modes />
      </transition>
      <load-default-grid />
      <show-game-details />
      <transition name="fade-in-out">
        <game-details />
      </transition>
    </app-controls>
  </div>
  <div v-else data-testid="not-valid-params" class="not-valid-params">
    Not valid N,M parameters <load-default-grid />
  </div>
</template>

<script setup lang="ts">
import AlgoModes from './AlgoModes.vue'
import AppControls from './AppControls.vue'
import DifficultyLevel from './DifficultyLevel.vue'
import DisplayGrid from './DisplayGrid.vue'
import GameDetails from './GameDetails.vue'
import GetFeedback from './GetFeedback.vue'
import LoadDefaultGrid from './LoadDefaultGrid.vue'
import PlayerModes from './PlayerModes.vue'
import ResetGame from './ResetGame.vue'
import ShowGameDetails from './ShowGameDetails.vue'
import { useGameLogic } from './useGameLogic'
import { usePreventRouteLeave } from './usePreventRouteLeave'

const { handleClickCell, hasValidDimensionProps } = useGameLogic()

usePreventRouteLeave()
</script>

<style scoped>
.tic-tac-toe-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.tic-tac-toe-wrapper > * {
  margin-bottom: 2rem;
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
</style>
