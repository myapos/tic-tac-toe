<template>
  <div
    v-if="hasValidDimensionProps()"
    class="tic-tac-toe-wrapper"
    data-testid="tic-tac-toe-wrapper"
  >
    <get-feedback :feedback="feedback" :M="M"></get-feedback>
    <display-grid :grid="grid" :isXTurn="isXTurn" @click-cell="handleClickCell"></display-grid>
    <app-controls>
      <div class="row">
        <reset-game :onReset="handleReset"></reset-game>
        <custom-button @click="toggleDetails" dataTestId="toggle-details-btn"
          >Show game details</custom-button
        >
      </div>
      <transition name="game-details">
        <game-details :N="N" :M="M" :showDetails="showDetails"></game-details>
      </transition>
    </app-controls>
  </div>
  <div v-else data-testid="not-valid-params">Not valid N,M parameters</div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import GetFeedback from './Feedback.vue'
import DisplayGrid from './DisplayGrid.vue'
import ResetGame from './ResetGame.vue'
import AppControls from './AppControls.vue'
import GameDetails from './GameDetails.vue'
import { useGameLogic } from './useGameLogic'

const props = defineProps({
  N: { type: Number, required: true },
  M: { type: Number, required: true }
})

const hasValidDimensionProps = () => {
  return (
    props.N >= 0 &&
    props.M >= 0 &&
    typeof props.N === 'number' &&
    typeof props.M === 'number' &&
    props.N >= props.M
  )
}

const {
  feedback,
  grid,
  handleClickCell,
  handleReset,
  isXTurn,
  setFeedback,
  toggleDetails,
  showDetails
} = useGameLogic(props)

watch(isXTurn, (newVal, oldVal) => {
  setFeedback(oldVal ? "It is O's turn!" : "It is X's turn!")
})
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
</style>
