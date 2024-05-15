import { ref, watch, toRaw } from 'vue'
import { O, X, initialCellValue } from '@/constants'
import type { gridT, cellCoordinatesT } from '@/components/types'

import { checkWinner } from './utils/checkWinner'
import { findBestMove } from './utils/findBestMove'
import isDraw from './utils/checkUtils/isDraw'

const createInitialGrid = (N: number): gridT => {
  return Array.from({ length: N }, () =>
    Array.from({ length: N }, () => [initialCellValue, initialCellValue])
  )
}

export const useGameLogic = (props: { N: number; M: number }) => {
  const totalCells = props.N * props.M
  const grid = ref(createInitialGrid(props.N))
  const feedback = ref("It is X's turn!")
  const counter = ref(0)
  const isXTurn = ref(true)
  const showDetails = ref(false)
  const gameStarted = ref(false)
  const gameEnded = ref(false)
  const filledCells = ref(0)
  const isInSinglePlayerMode = ref(false)

  const setIsInSinglePlayerMode = (value: boolean) => {
    isInSinglePlayerMode.value = value
  }

  const setFeedback = (feedbackVal: string) => {
    feedback.value = feedbackVal
  }

  const setGrid = (gridVal: gridT) => {
    grid.value = gridVal
  }

  const setIsXTurn = () => {
    isXTurn.value = counter.value % 2 === 0
  }

  const setCounter = (counterVal: number) => {
    counter.value = counterVal
    setIsXTurn()
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
  const computerSelection = (gridCopy: gridT) => {
    const move = findBestMove({ gridCopy, isXTurn, setCounter, counter, M: props.M })

    if (move) {
      grid.value[move.i][move.j][0] = O
    }

    const newCounter = counter.value + 1
    setCounter(newCounter)
    if (move) {
      const winnerMessage = checkWinner(grid.value, move.i, move.j, props.M, !isXTurn.value, true)
      if (winnerMessage.feedback) {
        setFeedback(winnerMessage.feedback)
        setGameEnded(totalCells)
        return
      }
    }
    // check draw
    if (isDraw({ grid: grid.value, counter: newCounter })) {
      setFeedback('It is a draw. No one wins.')
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
    const newCounter = counter.value + 1

    const currentTurn = isXTurn.value ? X : O
    if (grid.value[rowIdx][colIdx][0] === initialCellValue) {
      grid.value[rowIdx][colIdx][0] = currentTurn
    }

    const winnerMessage = checkWinner(newGrid, rowIdx, colIdx, props.M, isXTurn.value, true)
    if (winnerMessage.feedback) {
      setFeedback(winnerMessage.feedback)
      setGameEnded(totalCells)
      return
    }

    setGrid(newGrid)
    setCounter(newCounter)
    // Check draw as last step if no one wins
    if (isDraw({ grid: newGrid, counter: newCounter })) {
      setFeedback('It is a draw. No one wins.')
      setGameEnded(totalCells)
      return
    }

    if (isInSinglePlayerMode.value && !isXTurn.value) {
      // run logic to select next player's move
      computerSelection(structuredClone(toRaw(grid.value)))
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

  watch(isXTurn, (newVal, oldVal) => {
    if (!gameEnded.value) {
      setFeedback(oldVal ? "It is O's turn!" : "It is X's turn!")
    }
  })

  const handleReset = () => {
    setCounter(0)
    setGrid(createInitialGrid(props.N))
    setFeedback("It is X's turn!")
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

  return {
    counter,
    feedback,
    grid,
    handleClickCell,
    handleReset,
    isXTurn,
    setFeedback,
    setIsXTurn,
    toggleDetails,
    showDetails,
    hasValidDimensionProps,
    gameStarted,
    gameEnded,
    isInSinglePlayerMode,
    setIsInSinglePlayerMode
  }
}
