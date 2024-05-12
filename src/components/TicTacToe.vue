<template>
  <div v-if="hasValidDimensionProps" class="tic-tac-toe-wrapper" data-testid="tic-tac-toe-wrapper">
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
        <div class="gameDetails" v-show="showDetails" data-testid="details">
          <p>
            Note: This is an advanced version of Tic-tac-toe. This assignment was published in
            <a href="https://www.greatfrontend.com/" target="_blank"> Greatfrontend </a>platform.
          </p>
          <p>
            Tic-tac-toe is a game for two players who take turns making space in a three-by-three
            grid with X or O. The player who succeeds in playing three of their marks in a
            horizontal, vertical, or diagonal row is the winner. Source:
            <a href="https://en.wikipedia.org/wiki/Tic-tac-toe" target="_blank">Wikipedia</a>
          </p>
          <p>
            Traditionally, tic-tac-toe uses a 3 x 3 grid. In this problem, an advanced version of a
            tic-tac-toe game is built where the grid has N x N cells on the board and needs M marks
            in a horizontal, vertical, or diagonal row to win. The following diagram shows an
            example game where N = {{ N }} and M = {{ M }}.
          </p>
          <p>
            You can change these parameters by adding to the url parameters
            <span class="highlight-text">?N=4&M=3</span> where
            <span class="highlight-text">N >= M</span>.
            <a href="/?N=4&M=4">Try it!</a>
          </p>
        </div>
      </transition>
    </app-controls>
  </div>
  <div v-else data-testid="not-valid-params">Not valid N,M parameters</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GetFeedback from './Feedback.vue'
import DisplayGrid from './DisplayGrid.vue'
import ResetGame from './ResetGame.vue'
import AppControls from './AppControls.vue'

import checkRow from './checkUtils/checkRow'
import checkColumns from './checkUtils/checkColumns'
import checkPrimaryDiagonal from './checkUtils/checkPrimaryDiagonal'
import checkSecondaryDiagonal from './checkUtils/checkSecondaryDiagonal'
import isDraw from './checkUtils/isDraw'

import type { gridT } from './types'

import { O } from '@/constants'
import { X } from '@/constants'
const initialCellValue = ''

const createInitialGrid = (N: number): gridT => {
  return Array.from({ length: N }, () =>
    Array.from({ length: N }, () => [initialCellValue, initialCellValue])
  )
}

export default defineComponent({
  name: 'TicTacToe',
  props: {
    N: { type: Number, required: true },
    M: { type: Number, required: true }
  },
  components: { GetFeedback, ResetGame, DisplayGrid, AppControls },
  data() {
    const hasValidDimensionProps =
      this.N >= 0 &&
      this.M >= 0 &&
      typeof this.N === 'number' &&
      typeof this.M === 'number' &&
      this.N >= this.M

    return {
      grid: createInitialGrid(this.N),
      initialCellValue: false,
      counter: 0,
      feedback: "It is X's turn!",
      pos: [] as Array<number | undefined>,
      hasValidDimensionProps,
      X,
      O,
      isXTurn: true,
      showDetails: false
    }
  },
  computed: {},
  methods: {
    toggleDetails() {
      this.showDetails = !this.showDetails
    },
    setIsXTurn() {
      this.isXTurn = this.counter % 2 === 0
    },
    handleClickCell({ rowIdx, colIdx }: { rowIdx: number; colIdx: number }) {
      // check if the cell contains already content
      const cellHasContent = this.grid[rowIdx][colIdx][0].length > 0

      if (this.feedback.includes('win') || this.feedback.includes('draw') || cellHasContent) {
        // don't do anything if the game ended
        return
      }

      const newGrid = this.grid
      const newCounter = this.counter + 1

      const currentTurn = this.isXTurn ? X : O
      if (this.grid[rowIdx][colIdx][0] === initialCellValue) {
        this.grid[rowIdx][colIdx][0] = currentTurn
      }

      const lookingFor = this.isXTurn ? X : O

      //   check winner on new Grid for
      //   1. rows
      const rowResult = checkRow({
        grid: newGrid,
        startRowIdx: rowIdx,
        startColIdx: colIdx,
        lookingFor,
        target: this.M
      })

      if (rowResult.won) {
        this.setFeedback(`Player ${rowResult.winner} wins!`)
        return
      }

      // 2. columns
      const colResult = checkColumns({
        grid: newGrid,
        startRowIdx: rowIdx,
        startColIdx: colIdx,
        lookingFor,
        target: this.M
      })

      if (colResult.won) {
        this.setFeedback(`Player ${colResult.winner} wins!`)
        return
      }

      // 3. primary diagonal
      const primaryDiagonalResult = checkPrimaryDiagonal({
        grid: newGrid,
        startRowIdx: rowIdx,
        startColIdx: colIdx,
        lookingFor,
        target: this.M
      })

      if (primaryDiagonalResult.won) {
        this.setFeedback(`Player ${primaryDiagonalResult.winner} wins!`)
        return
      }

      // 4. secondary diagonal
      const secondaryDiagonalResult = checkSecondaryDiagonal({
        grid: newGrid,
        startRowIdx: rowIdx,
        startColIdx: colIdx,
        lookingFor,
        target: this.M
      })

      if (secondaryDiagonalResult.won) {
        this.setFeedback(`Player ${secondaryDiagonalResult.winner} wins!`)
        return
      }
      this.setGrid(newGrid)
      this.setPos([rowIdx, colIdx])
      this.setCounter(newCounter)

      // 5. check draw as last step if noone wins
      if (isDraw({ grid: newGrid, counter: newCounter })) {
        this.setFeedback('It is a draw. No one wins.')

        return
      }

      this.setIsXTurn()
    },
    setPos(pos: Array<number>) {
      this.pos = pos
    },
    setCounter(counterVal: number) {
      this.counter = counterVal
    },
    setFeedback(feedback: string) {
      this.feedback = feedback
    },
    setGrid(grid: gridT) {
      this.grid = grid
    },
    handleReset() {
      this.setCounter(0)
      this.setGrid(createInitialGrid(this.N))
      this.setIsXTurn()
      this.setFeedback("It is X's turn!")
      this.pos = []
    }
  },
  watch: {
    isXTurn(newVal, oldVal) {
      const wasXTurn = oldVal
      this.setFeedback(wasXTurn ? "It is O's turn!" : "It is X's turn!")
    },
    pos(newVal: Array<any>) {
      if (newVal.length === 0) {
        return
      }
    }
  }
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
