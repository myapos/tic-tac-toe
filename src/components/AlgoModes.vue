<template>
  <template v-if="shouldShowAlgoSelection">
    <form>
      <fieldset id="algo_modes_selection">
        <legend>Select algorithm</legend>
        <div class="algo_modes">
          <app-radio
            v-for="(radio, index) in radioButtons"
            :key="index"
            :id="radio.id"
            :labelText="radio.label"
            :name="radio.name"
            @change="onChange(radio.id)"
            @keydown.enter="onChange(radio.id)"
            :checked="activeAlgorithm === radio.id"
          />
        </div>
      </fieldset>
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
.algo_modes {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1rem 1rem;
  gap: 0.5rem;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1rem;
}

input[type='checkbox'] {
  width: 1.2rem;
  height: 1.2rem;
}

fieldset {
  padding-bottom: 1.2rem;
}

@media screen and (max-width: 600px) {
  .algo_modes {
    gap: 2.5rem;
  }

  form {
    font-size: 1.2rem;
  }

  legend {
    font-size: 1rem;
  }

  fieldset {
    padding-bottom: 2rem;
  }
}
</style>
