import { defineStore } from 'pinia'

import { playModes, itIsXturn } from '@/constants'

export const useGameStore = defineStore({
  id: 'gameStore',
  state: () => ({
    playMode: playModes.TWO_PLAYER,
    feedback: itIsXturn,
    counter: 0,
    isInSinglePlayerMode: false,
    isInAutoPlayerMode: false,
    isInTwoPlayerMode: false
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
    }
  }
})
