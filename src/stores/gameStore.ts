import { defineStore } from 'pinia'

import { playModes, itIsXturn } from '@/constants'

export const useGameStore = defineStore({
  id: 'gameStore',
  state: () => ({
    playMode: playModes.TWO_PLAYER,
    feedback: itIsXturn,
    counter: 0
  }),
  getters: {
    isXTurn(state) {
      return state.counter % 2 === 0
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
    }
  }
})
