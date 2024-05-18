<template>
  <form>
    <div class="row">
      <fieldset id="play_modes">
        <legend>Select player mode</legend>
        <app-radio
          v-for="(radio, index) in radioButtons"
          :key="index"
          :id="radio.id"
          :labelText="radio.label"
          :name="radio.name"
          @change="onChange(radio.id)"
          :checked="playMode === radio.id"
        />
      </fieldset>
    </div>
  </form>
</template>
<script lang="ts">
import { mapState, mapActions } from 'pinia'

import { playModes } from '@/constants'
import { useGameStore } from '@/stores/gameStore'

export default {
  name: 'PlayerModes',
  computed: {
    ...mapState(useGameStore, ['playMode'])
  },
  data() {
    const radioGroup: string = 'play_mode'

    return {
      radioButtons: [
        {
          value: playModes.SINGLE_PLAYER,
          label: playModes.SINGLE_PLAYER,
          id: playModes.SINGLE_PLAYER,
          name: radioGroup
        },
        {
          value: playModes.TWO_PLAYER,
          label: playModes.TWO_PLAYER,
          id: playModes.TWO_PLAYER,
          name: radioGroup
        },
        {
          value: playModes.AUTO_PLAYER,
          label: playModes.AUTO_PLAYER,
          id: playModes.AUTO_PLAYER,
          name: radioGroup
        }
      ] as Array<{
        value: keyof typeof playModes
        label: keyof typeof playModes
        id: keyof typeof playModes
        name: string
      }>
    }
  },
  methods: {
    ...mapActions(useGameStore, ['setPlayMode']),
    onChange(id: keyof typeof playModes) {
      this.setPlayMode(id)
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
