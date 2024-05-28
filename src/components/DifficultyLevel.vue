<template>
  <form>
    <label for="difficulty_level_selection">Select Difficulty level</label>
    <select
      id="difficulty_level_selection"
      v-model="gameStore.difficultyLevel"
      class="custom-select"
    >
      <option v-for="level in difficultyLevels" :key="level" :value="level">
        {{ level }}
      </option>
    </select>
    <span class="custom-arrow"></span>
  </form>
</template>

<script setup lang="ts">
import { difficultyLevels } from '@/constants'
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

form label {
  font-size: 0.9rem;
  color: var(--vt-c-white-mute);
  margin-bottom: 0.5em;
}

form select {
  font-size: 1.1rem;
  padding: 0.2rem;
  border-radius: 0.2rem;
  width: 100%;
  background-color: var(--vt-c-divider-dark-1);
  color: var(--vt-c-white-mute);
}
</style>
