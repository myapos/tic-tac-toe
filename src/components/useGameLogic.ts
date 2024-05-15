import { ref, watch, toRaw } from 'vue'
import { O, X, MAX_DEPTH } from '@/constants'
import type { gridT, cellCoordinatesT } from '@/components/types'

import { checkWinner } from './utils/checkWinner'
import isDraw from './utils/checkUtils/isDraw'

const initialCellValue = ''

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

  interface checkAiWinnerResultI {
    feedback: string
    winner: string
    won: boolean
  }

  interface checkAiWinnerI {
    grid: any
    shouldMarkWinningCells: boolean
  }

  const checkAiWinner = ({
    grid,
    shouldMarkWinningCells
  }: checkAiWinnerI): checkAiWinnerResultI => {
    let result: checkAiWinnerResultI = {
      feedback: '',
      winner: '',
      won: false
    }
    for (let i = 0; i < props.N; i++) {
      for (let j = 0; j < props.N; j++) {
        result = checkWinner(grid, i, j, props.M, isXTurn.value, shouldMarkWinningCells)

        if (result.won) {
          break
        }
      }
      if (result?.won) {
        break
      }
    }

    return result
  }

  const findEmptyCells = (grid: gridT) => {
    let emptyCells = 0
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j][0] === initialCellValue) {
          emptyCells++
        }
      }
    }

    return emptyCells
  }

  const minimax = ({
    grid,
    depth,
    isMaximizing
  }: {
    grid: gridT
    depth: number
    isMaximizing: boolean
  }) => {
    const result = checkAiWinner({ grid, shouldMarkWinningCells: false })
    // Check draw as last step if no one wins
    if (isDraw({ grid, counter: counter.value })) {
      return 0
    }

    if (result.won) {
      const emptyCells = findEmptyCells(grid)
      return isMaximizing ? 1 * (emptyCells + 1) : -1 * (emptyCells + 1)
    }

    // if (depth === MAX_DEPTH) {
    //   console.log('reached depth ', MAX_DEPTH)
    //   const emptyCells = findEmptyCells(grid)
    //   return isMaximizing ? 1 * (emptyCells + 1) : -1 * (emptyCells + 1)
    // }

    if (isMaximizing) {
      let bestScore = -Infinity
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
          const cellValue = grid[i][j][0]
          if (cellValue === initialCellValue) {
            setCounter(counter.value + 1)
            grid[i][j][0] = X
            const score = minimax({ grid, depth: depth + 1, isMaximizing: false })
            grid[i][j][0] = initialCellValue
            setCounter(counter.value - 1)
            bestScore = Math.max(score, bestScore)
          }
        }
      }

      return bestScore
    } else {
      let bestScore = Infinity
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
          const cellValue = grid[i][j][0]
          if (cellValue === initialCellValue) {
            setCounter(counter.value + 1)
            grid[i][j][0] = O
            const score = minimax({ grid, depth: depth + 1, isMaximizing: true })
            grid[i][j][0] = initialCellValue
            setCounter(counter.value - 1)

            bestScore = Math.min(score, bestScore)
          }
        }
      }

      return bestScore
    }
  }

  /* O is minimizing I want to be the ai, X is maximizing  */

  const findBestMove = (gridCopy: gridT) => {
    console.log('looking for best move is x', isXTurn.value)
    // AI to make its turn
    let bestScore = Infinity
    let move
    for (let i = 0; i < gridCopy.length; i++) {
      for (let j = 0; j < gridCopy[0].length; j++) {
        // Is the spot available?
        if (gridCopy[i][j][0] == initialCellValue) {
          gridCopy[i][j][0] = O
          setCounter(counter.value + 1)
          const score = minimax({ grid: gridCopy, depth: 0, isMaximizing: true })
          gridCopy[i][j][0] = initialCellValue
          setCounter(counter.value - 1)
          if (score <= bestScore) {
            bestScore = score
            move = { i, j }
          }
        }
      }
    }

    return move
  }

  const computerSelection = (gridCopy: gridT) => {
    const move = findBestMove(gridCopy)

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
