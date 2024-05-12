import { ref } from 'vue'
import { O } from '@/constants'
import { X } from '@/constants'

import { checkWinner } from './utils/gameLogic'
import isDraw from './utils/checkUtils/isDraw'

const initialCellValue = ''

const createInitialGrid = (N: number): gridT => {
  return Array.from({ length: N }, () =>
    Array.from({ length: N }, () => [initialCellValue, initialCellValue])
  )
}

export const useGameLogic = (props: { N: number; M: number }) => {
  const grid = ref(createInitialGrid(props.N))
  const feedback = ref("It is X's turn!")
  const pos = ref<Array<number | undefined>>([])
  const counter = ref(0)
  const isXTurn = ref(true)
  const showDetails = ref(false)

  const setPos = (posArray: Array<number>) => {
    pos.value = posArray
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
  }

  const handleClickCell = ({ rowIdx, colIdx }: { rowIdx: number; colIdx: number }) => {
    // Check if the cell contains already content
    const cellHasContent = grid.value[rowIdx][colIdx][0].length > 0

    if (feedback.value.includes('win') || feedback.value.includes('draw') || cellHasContent) {
      // Don't do anything if the game ended
      return
    }

    const newGrid = grid.value
    const newCounter = counter.value + 1

    const currentTurn = isXTurn.value ? X : O
    if (grid.value[rowIdx][colIdx][0] === initialCellValue) {
      grid.value[rowIdx][colIdx][0] = currentTurn
    }

    const winnerMessage = checkWinner(newGrid, rowIdx, colIdx, props.M, isXTurn.value)
    if (winnerMessage) {
      setFeedback(winnerMessage)
      return
    }

    setGrid(newGrid)
    setPos([rowIdx, colIdx])
    setCounter(newCounter)

    // Check draw as last step if no one wins
    if (isDraw({ grid: newGrid, counter: newCounter })) {
      setFeedback('It is a draw. No one wins.')
      return
    }

    setIsXTurn()
  }
  const handleReset = () => {
    setCounter(0)
    setGrid(createInitialGrid(props.N))
    setIsXTurn()
    setFeedback("It is X's turn!")
    pos.value = []
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
    pos,
    setFeedback,
    setIsXTurn,
    setPos,
    toggleDetails,
    showDetails,
    hasValidDimensionProps
  }
}
