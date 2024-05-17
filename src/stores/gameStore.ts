import { defineStore } from 'pinia'

import { playModes, itIsXturn } from '@/constants'

export const useGameStore = defineStore({
  id: 'gameStore',
  state: () => ({
    playMode: playModes.TWO_PLAYER,
    feedback: itIsXturn
  }),
  actions: {
    setPlayMode(newMode: keyof typeof playModes) {
      this.playMode = newMode
    },
    setFeedback(feedbackVal: string) {
      this.feedback = feedbackVal
    }
  }
})
