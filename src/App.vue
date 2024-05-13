<template>
  <div class="tic-tac-toe-container">
    <router-view :key="key" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup() {
    const key = ref(0)
    const route = useRoute()

    const reloadComponent = () => {
      key.value++
    }

    // Watch for changes in route params and reload component
    watch(() => route.params, reloadComponent, { deep: true })

    return {
      key
    }
  }
})
</script>

<style scoped>
.tic-tac-toe-container {
  margin: 0 auto;
  width: 100%;
}
</style>
