import { onBeforeMount, onBeforeUnmount } from 'vue'
import type { Ref } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'

interface GameStatus {
  gameStarted: Ref<boolean>
  gameEnded: Ref<boolean>
}

export const usePreventRouteLeave = ({ gameStarted, gameEnded }: GameStatus) => {
  function preventNav(event: BeforeUnloadEvent) {
    if (gameStarted.value) {
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
    if (gameStarted.value && !gameEnded.value) {
      if (!window.confirm('Changes you made may not be saved.')) {
        return
      }
    }
    next()
  })
}
