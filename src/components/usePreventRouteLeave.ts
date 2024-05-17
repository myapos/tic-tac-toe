import { onBeforeMount, onBeforeUnmount } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

import { useGameStore } from '@/stores/gameStore'

export const usePreventRouteLeave = () => {
  const gameStore = useGameStore()

  function preventNav(event: BeforeUnloadEvent) {
    if (gameStore.gameStarted) {
      event.preventDefault()
    }
  }

  onBeforeMount(() => {
    window.addEventListener('beforeunload', preventNav)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', preventNav)
  })

  onBeforeRouteLeave((to, from, next) => {
    if (gameStore.gameStarted && !gameStore.gameEnded) {
      if (!window.confirm('Changes you made may not be saved.')) {
        return
      }
    }
    next()
  })
}
