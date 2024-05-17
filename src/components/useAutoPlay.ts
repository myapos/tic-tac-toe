import { watch, toRaw } from 'vue'
import type { Ref } from 'vue'

import findEmptyCells from './utils/findEmptyCells'
import getPlayMode from './utils/getPlayMode'
import getRandomValueInRange from './utils/getRandomValueInRange'

import type { gridT } from '@/components/types'
import { X, restartingGame, ROUND_DELAY, RESTART_DELAY } from '@/constants'
import { useGameStore } from '@/stores/gameStore'

interface useAutoPlayI {
  computerSelection: any
  counter: Ref<number>
  gameEnded: Ref<boolean>
  grid: Ref<gridT>
  handleReset: () => void
  isInAutoPlayerMode: Ref<boolean>
  isInSinglePlayerMode: Ref<boolean>
  isInTwoPlayerMode: Ref<boolean>
  setGrid: (val: gridT) => void
}
export const useAutoPlay = ({
  computerSelection,
  counter,
  gameEnded,
  grid,
  handleReset,
  isInAutoPlayerMode,
  isInSinglePlayerMode,
  isInTwoPlayerMode,
  setGrid
}: useAutoPlayI) => {
  const gameStore = useGameStore()

  const placeXInRandomCoordinates = () => {
    const initialXi = getRandomValueInRange(grid.value.length)
    const initialXj = getRandomValueInRange(grid.value[0].length)

    grid.value[initialXi][initialXj][0] = X
    const newCounter = counter.value + 1

    setGrid(grid.value)
    gameStore.setCounter(newCounter)
    return true
  }

  const startAutoPlay = () => {
    const detectedMode = getPlayMode(gameStore.playMode)
    if (!detectedMode.autoPlayer) {
      return
    }
    let placedX = false
    let emptyCells = findEmptyCells(grid.value)

    // Define a function to perform the next iteration of the loop with a delay
    const nextIteration = () => {
      setTimeout(() => {
        // Start auto game for two players
        while (emptyCells !== 0) {
          const detectedMode = getPlayMode(gameStore.playMode)
          if (!detectedMode.autoPlayer) {
            handleReset()
            emptyCells = 0
            break
          }
          if (!placedX) {
            placedX = placeXInRandomCoordinates()
            emptyCells = findEmptyCells(grid.value)
            break // Exit loop after placing X
          }

          if (gameStore.isXTurn) {
            computerSelection(structuredClone(toRaw(grid.value)), true)

            emptyCells = findEmptyCells(grid.value)
            break // Exit loop after computer's selection
          }

          if (!gameStore.isXTurn) {
            computerSelection(structuredClone(toRaw(grid.value)), false)

            emptyCells = findEmptyCells(grid.value)
            break // Exit loop after computer's selection
          }
        }

        // Check if the loop should continue
        if (emptyCells !== 0 && !gameEnded.value) {
          nextIteration() // Call the function recursively to perform the next iteration
        }
        if (emptyCells === 0 || gameEnded.value) {
          setTimeout(() => {
            gameStore.setFeedback(restartingGame)
          }, RESTART_DELAY)
          //restart auto play mode
          setTimeout(() => {
            handleReset()
            startAutoPlay()
          }, RESTART_DELAY * 2)
        }
      }, ROUND_DELAY) // Delay of 1 second
    }

    nextIteration() // Start the loop
  }

  // Watch for changes in playMode and call a function
  watch(
    () => gameStore.playMode,
    (newPlayMode) => {
      console.log('Play mode changed:', newPlayMode)
      const detectedMode = getPlayMode(newPlayMode)
      handleReset()
      if (detectedMode.singlePlayer) {
        isInSinglePlayerMode.value = true
        isInTwoPlayerMode.value = false
        isInAutoPlayerMode.value = false
        return
      }
      if (detectedMode.twoPlayer) {
        isInTwoPlayerMode.value = true
        isInSinglePlayerMode.value = false
        isInAutoPlayerMode.value = false
        return
      }
      if (detectedMode.autoPlayer) {
        isInAutoPlayerMode.value = true
        isInTwoPlayerMode.value = false
        isInSinglePlayerMode.value = false
        startAutoPlay()
        return
      }
    }
  )
}

export default useAutoPlay
