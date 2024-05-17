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
      </div>
      <transition name="game-details">
        <game-details :N="N" :M="M" />
      </transition>
    </app-controls>
  </div>
  <div v-else data-testid="not-valid-params" class="not-valid-params">
    Not valid N,M parameters <load-default-grid />
  </div>
</template>

<script setup lang="ts">
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
  display: flex;
  justify-content: center;
  gap: 1rem;
}
.game-details-enter-active,
.game-details-leave-active {
  transition: opacity 1s ease;
}

.game-details-enter-from,
.game-details-leave-to {
  opacity: 0;
}

.not-valid-params {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}
</style>
