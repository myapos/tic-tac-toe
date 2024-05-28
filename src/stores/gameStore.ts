import { defineStore } from 'pinia'

import type { gridT } from '@/components/types'
import createEmptyGrid from '@/components/utils/createEmptyGrid'
import isPlaywright from '@/components/utils/isPlaywright'
import { playModes, itIsXturn, algorithms, difficultyLevels } from '@/constants'

export const useGameStore = defineStore({
  id: 'gameStore',
  state: () => ({
    playMode: playModes.TWO_PLAYER,
    feedback: itIsXturn,
    counter: 0,
    isInSinglePlayerMode: false,
    isInAutoPlayerMode: false,
    isInTwoPlayerMode: true,
    grid: [] as gridT,
    filledCells: 0,
    showDetails: false,
    totalCells: 0,
    gameStarted: false,
    gameEnded: false,
    activeAlgorithm: algorithms.MINIMAX as keyof typeof algorithms,
    isNegamax: false,
    memo: new Map<string, number>(),
    supportsStructuredClone: typeof structuredClone !== 'undefined',
    N: 0,
    M: 0,
    difficultyLevel: isPlaywright() ? difficultyLevels.HARD : difficultyLevels.EASY
  }),
  getters: {
    isXTurn(state) {
      return state.counter % 2 === 0
    },
    activeMode(state) {
      if (state.isInSinglePlayerMode) {
        return playModes.SINGLE_PLAYER
      }
      if (state.isInTwoPlayerMode) {
        return playModes.TWO_PLAYER
      }
      if (state.isInAutoPlayerMode) {
        return playModes.AUTO_PLAYER
      }
    }
  },
  actions: {
    handleReset() {
      this.setCounter(0)
      this.setGrid(createEmptyGrid(this.N))
      this.setFeedback(itIsXturn)
      this.setFilledCells(0)
      this.setGameStarted(0)
      this.setGameEnded(0)
      this.resetMemo()
    },
    setDifficultyLevel(level: string) {
      this.difficultyLevel = level
    },
    setGridDimensions(gridDimensions: { N: number; M: number }) {
      this.N = gridDimensions.N
      this.M = gridDimensions.M
    },
    setPlayMode(newMode: keyof typeof playModes) {
      this.playMode = newMode
    },
    setFeedback(feedbackVal: string) {
      this.feedback = feedbackVal
    },
    setCounter(counterVal: number) {
      this.counter = counterVal
    },
    setIsInSinglePlayerMode(val: boolean) {
      this.isInSinglePlayerMode = val
    },
    setIsInAutoPlayerMode(val: boolean) {
      this.isInAutoPlayerMode = val
    },
    setIsInTwoPlayerMode(val: boolean) {
      this.isInTwoPlayerMode = val
    },
    setGrid(gridVal: gridT) {
      this.grid = gridVal
    },
    setGridCell(i: number, j: number, cellIdx: number, value: string) {
      this.grid[i][j][cellIdx] = value
    },
    setFilledCells(val: number) {
      this.filledCells = val
    },
    countFilledCells(this) {
      this.filledCells = this.grid.reduce((accRow, row) => {
        return (
          accRow +
          row.reduce((accCell, cell) => {
            return accCell + (cell[0] === '' ? 0 : 1)
          }, 0)
        )
      }, 0)
    },
    toggleDetails() {
      this.showDetails = !this.showDetails
    },
    setTotalCells(val: number) {
      this.totalCells = val
    },
    setGameStarted(numOfCells: number) {
      this.gameStarted = numOfCells > 0
    },
    setGameEnded(numOfCells: number) {
      this.gameEnded = numOfCells === this.totalCells
    },
    setAlgorithm(algo: keyof typeof algorithms) {
      this.activeAlgorithm = algo
    },
    setMemo(boardKey: string, bestScore: number) {
      this.memo.set(boardKey, bestScore)
    },
    resetMemo() {
      this.memo = new Map<string, number>()
    }
  }
})
