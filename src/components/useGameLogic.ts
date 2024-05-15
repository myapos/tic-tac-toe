import { ref, watch, toRaw } from 'vue'
import { O, X, initialCellValue } from '@/constants'
import type { gridT, cellCoordinatesT } from '@/components/types'

import { checkWinner } from './utils/checkWinner'
import { findBestMove } from './utils/findBestMove'
import findEmptyCells from './utils/findEmptyCells'
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
  const isInAutoPlayerMode = ref(false)
  const isInTowPlayerMode = ref(false)
  const playMode = ref('2P')

  const setPlayMode = (value: string) => {
    playMode.value = value
  }

  watch(
    () => playMode.value,
    () => {
      if (playMode.value === '1P') {
        isInSinglePlayerMode.value = true
        return
      }
      isInSinglePlayerMode.value = false
    }
  )

  watch(
    () => playMode.value,
    () => {
      if (playMode.value === 'Auto') {
        isInAutoPlayerMode.value = true
        return
      }
      isInAutoPlayerMode.value = false
    }
  )

  watch(
    () => isInAutoPlayerMode.value,
    () => {
      if (isInAutoPlayerMode.value) {
        let placedX = false
        let emptyCells = findEmptyCells(grid.value)

        // Define a function to perform the next iteration of the loop with a delay
        const nextIteration = () => {
          setTimeout(() => {
            // Start auto game for two players
            while (emptyCells !== 0) {
              if (!placedX) {
                const initialXi = Math.floor(Math.random() * (grid.value.length - 1))
                const initialXj = Math.floor(Math.random() * (grid.value[0].length - 1))

                grid.value[initialXi][initialXj][0] = X
                const newCounter = counter.value + 1

                setGrid(grid.value)
                setCounter(newCounter)
                placedX = true
                emptyCells = findEmptyCells(grid.value)
                break // Exit loop after placing X
              }

              if (isXTurn.value) {
                computerSelection(structuredClone(toRaw(grid.value)), true)

                emptyCells = findEmptyCells(grid.value)
                break // Exit loop after computer's selection
              }

              if (!isXTurn.value) {
                computerSelection(structuredClone(toRaw(grid.value)), false)

                emptyCells = findEmptyCells(grid.value)
                break // Exit loop after computer's selection
              }
            }

            // Check if the loop should continue
            if (emptyCells !== 0 && !gameEnded.value) {
              nextIteration() // Call the function recursively to perform the next iteration
            }
          }, 500) // Delay of 1 second
        }

        nextIteration() // Start the loop
      }
    }
  )

  watch(
    () => playMode.value,
    () => {
      if (playMode.value === '2P') {
        isInTowPlayerMode.value = true
        return
      }
      isInTowPlayerMode.value = false
    }
  )

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
  const computerSelection = (gridCopy: gridT, isMaximizing: boolean) => {
    const move = findBestMove({ gridCopy, isXTurn, setCounter, counter, M: props.M, isMaximizing })

    if (move) {
      grid.value[move.i][move.j][0] = isMaximizing ? X : O
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
    playMode,
    setPlayMode
  }
}
