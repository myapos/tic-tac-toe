import { ref, watch, toRaw } from 'vue'

import useAutoPlay from './useAutoPlay'
import isDraw from './utils/checkUtils/isDraw'
import { checkWinner } from './utils/checkWinner'
import createEmptyGrid from './utils/createEmptyGrid'
import { findBestMove } from './utils/findBestMove'

import type { gridT, cellCoordinatesT } from '@/components/types'
import { O, X, initialCellValue, itIsXturn, itIsOturn, itIsDraw } from '@/constants'
import { useGameStore } from '@/stores/gameStore'

export const useGameLogic = (props: { N: number; M: number }) => {
  const gameStore = useGameStore()
  const totalCells = props.N * props.M
  const grid = ref(createEmptyGrid(props.N))
  const showDetails = ref(false)
  const gameStarted = ref(false)
  const gameEnded = ref(false)
  const filledCells = ref(0)

  const setGrid = (gridVal: gridT) => {
    grid.value = gridVal
  }

  const setGameStarted = (filledCells: number) => {
    gameStarted.value = filledCells > 0
  }

  const setGameEnded = (filledCells: number) => {
    gameEnded.value = filledCells === totalCells
  }

  const setFilledCells = () => {
    filledCells.value = grid.value.reduce((accRow, row) => {
      return (
        accRow +
        row.reduce((accCell, cell) => {
          return accCell + (cell[0] === '' ? 0 : 1)
        }, 0)
      )
    }, 0)
  }

  /* O is minimizing I want to be the ai, X is maximizing  */
  const computerSelection = (gridCopy: gridT, isMaximizing: boolean) => {
    const move = findBestMove({ gridCopy, isXTurn: gameStore.isXTurn, M: props.M, isMaximizing })

    if (move) {
      grid.value[move.i][move.j][0] = isMaximizing ? X : O
    }

    const newCounter = gameStore.counter + 1
    gameStore.setCounter(newCounter)
    if (move) {
      const winnerMessage = checkWinner(
        grid.value,
        move.i,
        move.j,
        props.M,
        !gameStore.isXTurn,
        true
      )
      if (winnerMessage.feedback) {
        gameStore.setFeedback(winnerMessage.feedback)
        setGameEnded(totalCells)
        return
      }
    }
    // check draw
    if (isDraw({ grid: grid.value })) {
      gameStore.setFeedback(itIsDraw)
      setGameEnded(totalCells)
      return
    }
  }

  const handleClickCell = ({ rowIdx, colIdx }: cellCoordinatesT) => {
    // Check if the cell contains already content
    const cellHasContent = grid.value[rowIdx][colIdx][0].length > 0

    if (gameEnded.value || cellHasContent) {
      // Don't do anything if the game ended
      return
    }

    const newGrid = grid.value
    const newCounter = gameStore.counter + 1

    const currentTurn = gameStore.isXTurn ? X : O
    if (grid.value[rowIdx][colIdx][0] === initialCellValue) {
      grid.value[rowIdx][colIdx][0] = currentTurn
    }

    const winnerMessage = checkWinner(newGrid, rowIdx, colIdx, props.M, gameStore.isXTurn, true)
    if (winnerMessage.feedback) {
      gameStore.setFeedback(winnerMessage.feedback)
      setGameEnded(totalCells)
      return
    }

    setGrid(newGrid)
    gameStore.setCounter(newCounter)
    // Check draw as last step if no one wins
    if (isDraw({ grid: newGrid })) {
      gameStore.setFeedback(itIsDraw)
      setGameEnded(totalCells)
      return
    }

    if (gameStore.isInSinglePlayerMode && !gameStore.isXTurn) {
      // run logic to select next player's move
      computerSelection(structuredClone(toRaw(grid.value)), false)
    }
  }

  watch(
    () => grid.value,
    () => {
      setFilledCells()

      if (filledCells.value > 0) {
        setGameStarted(filledCells.value)
      }

      if (filledCells.value === props.N * props.M) {
        setGameEnded(filledCells.value)
      }
    },
    {
      deep: true
    }
  )

  watch(
    () => gameStore.isXTurn,
    (newVal, oldVal) => {
      console.log('value', newVal, oldVal)
      if (!gameEnded.value) {
        gameStore.setFeedback(oldVal ? itIsOturn : itIsXturn)
      }
    }
  )

  const handleReset = () => {
    gameStore.setCounter(0)
    setGrid(createEmptyGrid(props.N))
    gameStore.setFeedback(itIsXturn)
    filledCells.value = 0
    setGameStarted(0)
    setGameEnded(0)
  }

  const toggleDetails = () => {
    showDetails.value = !showDetails.value
  }
  const hasValidDimensionProps = () => {
    return (
      props.N >= 0 &&
      props.M >= 0 &&
      typeof props.N === 'number' &&
      typeof props.M === 'number' &&
      props.N >= props.M
    )
  }

  useAutoPlay({
    handleReset,
    grid,
    setGrid,
    computerSelection,
    gameEnded
  })

  return {
    grid,
    handleClickCell,
    handleReset,
    toggleDetails,
    showDetails,
    hasValidDimensionProps,
    gameStarted,
    gameEnded
  }
}
