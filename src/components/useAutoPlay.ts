import { cloneDeep } from 'lodash'
import { watch, toRaw, computed } from 'vue'

import findEmptyCells from './utils/findEmptyCells'
import getPlayMode from './utils/getPlayMode'
import getRandomValueInRange from './utils/getRandomValueInRange'

import { X, restartingGame, ROUND_DELAY, RESTART_DELAY } from '@/constants'
import { useGameStore } from '@/stores/gameStore'

interface useAutoPlayI {
  computerSelection: any
}
export const useAutoPlay = ({ computerSelection }: useAutoPlayI) => {
  const gameStore = useGameStore()

  const placeXInRandomCoordinates = () => {
    const initialXi = getRandomValueInRange(gameStore.grid.length)
    const initialXj = getRandomValueInRange(gameStore.grid[0].length)

    gameStore.setGridCell(initialXi, initialXj, 0, X)
    const newCounter = gameStore.counter + 1

    gameStore.setCounter(newCounter)
    return true
  }

  const startAutoPlay = () => {
    const detectedMode = getPlayMode(gameStore.playMode)
    if (!detectedMode.autoPlayer) {
      return
    }
    let placedX = false
    let emptyCells = findEmptyCells(gameStore.grid)

    // Define a function to perform the next iteration of the loop with a delay
    const nextIteration = () => {
      setTimeout(() => {
        // Start auto game for two players
        while (emptyCells !== 0) {
          const detectedMode = getPlayMode(gameStore.playMode)
          if (!detectedMode.autoPlayer) {
            gameStore.handleReset()
            emptyCells = 0
            break
          }
          if (!placedX) {
            placedX = placeXInRandomCoordinates()
            emptyCells = findEmptyCells(gameStore.grid)
            break // Exit loop after placing X
          }

          if (gameStore.isXTurn) {
            computerSelection(
              gameStore.supportsStructuredClone
                ? structuredClone(toRaw(gameStore.grid))
                : cloneDeep(toRaw(gameStore.grid)),
              true
            )

            emptyCells = findEmptyCells(gameStore.grid)
            break // Exit loop after computer's selection
          }

          if (!gameStore.isXTurn) {
            computerSelection(
              gameStore.supportsStructuredClone
                ? structuredClone(toRaw(gameStore.grid))
                : cloneDeep(toRaw(gameStore.grid)),
              false
            )

            emptyCells = findEmptyCells(gameStore.grid)
            break // Exit loop after computer's selection
          }
        }

        // Check if the loop should continue
        if (emptyCells !== 0 && !gameStore.gameEnded) {
          nextIteration() // Call the function recursively to perform the next iteration
        }
        if (emptyCells === 0 || gameStore.gameEnded) {
          setTimeout(() => {
            gameStore.setFeedback(restartingGame)
          }, RESTART_DELAY)
          //restart auto play mode
          setTimeout(() => {
            gameStore.handleReset()
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
      const detectedMode = getPlayMode(newPlayMode)
      gameStore.handleReset()
      if (detectedMode.singlePlayer) {
        gameStore.setIsInSinglePlayerMode(true)
        gameStore.setIsInAutoPlayerMode(false)
        gameStore.setIsInTwoPlayerMode(false)
        return
      }
      if (detectedMode.twoPlayer) {
        gameStore.setIsInSinglePlayerMode(false)
        gameStore.setIsInAutoPlayerMode(false)
        gameStore.setIsInTwoPlayerMode(true)
        return
      }
      if (detectedMode.autoPlayer) {
        gameStore.setIsInSinglePlayerMode(false)
        gameStore.setIsInAutoPlayerMode(true)
        gameStore.setIsInTwoPlayerMode(false)
        startAutoPlay()
        return
      }
    }
  )

  const dimensionWatcher = computed(() => [gameStore.N, gameStore.M])
  watch(dimensionWatcher, () => {
    gameStore.handleReset()
  })
}

export default useAutoPlay
