<template>
  <form>
    <app-select
      labelText="Select Difficulty level"
      id="difficulty_level_selection"
      :options="difficultyLevels"
      @update:selectValue="updateDifficultyLevel"
    />
  </form>
</template>

<script setup lang="ts">
import { difficultyLevels } from '@/constants'
import { useGameStore } from '@/stores/gameStore'

const gameStore = useGameStore()

const updateDifficultyLevel = (level: string) => {
  gameStore.setDifficultyLevel(level)
}
</script>
