import { defineStore } from 'pinia'

import type { gridT } from '@/components/types'
import { playModes, itIsXturn, algorithms } from '@/constants'

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
    supportsStructuredClone: typeof structuredClone !== 'undefined'
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
