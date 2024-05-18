<template>
  <template v-if="shouldShowAlgoSelection">
    <form>
      <div class="row">
        <fieldset id="algo_modes">
          <legend>Select algorithm</legend>
          <app-radio
            v-for="(radio, index) in radioButtons"
            :key="index"
            :id="radio.id"
            :labelText="radio.label"
            :name="radio.name"
            @change="onChange(radio.id)"
            :checked="activeAlgorithm === radio.id"
          />
        </fieldset>
      </div>
    </form>
  </template>
</template>
<script lang="ts">
import { mapState, mapActions } from 'pinia'

import { algorithms } from '@/constants'
import { useGameStore } from '@/stores/gameStore'

export default {
  name: 'AlgoModes',
  computed: {
    ...mapState(useGameStore, [
      'activeAlgorithm',
      'isInSinglePlayerMode',
      'isInAutoPlayerMode',
      'isInTwoPlayerMode'
    ]),
    shouldShowAlgoSelection() {
      return this.isInAutoPlayerMode || this.isInSinglePlayerMode
    }
  },
  data() {
    const radioGroup: string = 'algo_mode'

    return {
      radioButtons: [
        {
          value: algorithms.MINIMAX,
          label: algorithms.MINIMAX,
          id: algorithms.MINIMAX,
          name: radioGroup
        },
        {
          value: algorithms.NEGAMAX,
          label: algorithms.NEGAMAX,
          id: algorithms.NEGAMAX,
          name: radioGroup
        }
      ] as Array<{
        value: keyof typeof algorithms
        label: keyof typeof algorithms
        id: keyof typeof algorithms
        name: string
      }>
    }
  },
  methods: {
    ...mapActions(useGameStore, ['setAlgorithm']),
    onChange(id: keyof typeof algorithms) {
      this.setAlgorithm(id)
    }
  }
}
</script>
<style scoped>
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1rem;
  .row {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  input[type='checkbox'] {
    width: 1.2rem;
    height: 1.2rem;
  }
}
</style>
