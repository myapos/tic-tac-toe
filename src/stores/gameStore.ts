import { defineStore } from 'pinia'

import { playModes } from '@/constants'

export const useGameStore = defineStore({
  id: 'gameStore',
  state: () => ({
    playMode: playModes.TWO_PLAYER
  }),
  actions: {
    setPlayMode(newMode: keyof typeof playModes) {
      this.playMode = newMode
    }
  }
})
