<template>
  <div v-if="hasValidDimensionProps" class="tic-tac-toe-wrapper">
    <get-feedback :feedback="feedback" :M="M"></get-feedback>
    <display-grid :grid="grid" :isXTurn="isXTurn" @click-cell="handleClickCell"></display-grid>
    <app-controls>
      <div class="row">
        <reset-game :onReset="handleReset"></reset-game>
        <custom-button @click="toggleDetails">Show game details</custom-button>
      </div>
      <div class="gameDetails" v-show="showDetails">Looking for {{ M }} consecutive values</div>
    </app-controls>
  </div>
  <div v-else>Not valid N,M parameters</div>
  <div>{{ gameResult }}</div>
</template>

<script lang="ts">
import GetFeedback from './Feedback.vue'
import DisplayGrid from './DisplayGrid.vue'
import ResetGame from './ResetGame.vue'
import AppControls from './AppControls.vue'

import checkRow from './checkUtils/checkRow'
import checkColumns from './checkUtils/checkColumns'
import checkPrimaryDiagonal from './checkUtils/checkPrimaryDiagonal'
import checkSecondaryDiagonal from './checkUtils/checkSecondaryDiagonal'
import isDraw from './checkUtils/isDraw'

const O = 'O'
const X = 'X'
const initialCellValue = ''

const createInitialGrid = (N: number) => {
  return Array.from({ length: N }, () => Array.from({ length: N }, () => initialCellValue))
}

export default {
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
      showDetails: false,
      gameResult: {}
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
      const cellHasContent = this.grid[rowIdx][colIdx].length > 0

      if (this.feedback.includes('win') || this.feedback.includes('draw') || cellHasContent) {
        // don't do anything if the game ended
        return
      }

      const newGrid = this.grid
      const newCounter = this.counter + 1

      const currentTurn = this.isXTurn ? X : O
      if (this.grid[rowIdx][colIdx] === initialCellValue) {
        this.grid[rowIdx][colIdx] = currentTurn
      }

      const lookingFor = this.isXTurn ? X : O

      //   const wasXTurn = !this.isXTurn
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
        this.setGameResult({
          rowIdx,
          colIdx,
          winner: rowResult.winner,
          type: 'row'
        })
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
        this.setGameResult({
          rowIdx,
          colIdx,
          winner: colResult.winner,
          type: 'col'
        })
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
        this.setGameResult({
          rowIdx,
          colIdx,
          winner: primaryDiagonalResult.winner,
          type: 'primary'
        })
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
        this.setGameResult({
          rowIdx,
          colIdx,
          winner: secondaryDiagonalResult.winner,
          type: 'secondary'
        })
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
    setGrid(grid: Array<Array<string>>) {
      this.grid = grid
    },
    handleReset() {
      this.setCounter(0)
      this.setGrid(createInitialGrid(this.N))
      this.setIsXTurn()
      this.setFeedback("It is X's turn!")
      this.pos = []
      this.gameResult = {}
    },
    setGameResult(result) {
      this.gameResult = result
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
}
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
}

.row {
  display: flex;
  gap: 1rem;
}
</style>
