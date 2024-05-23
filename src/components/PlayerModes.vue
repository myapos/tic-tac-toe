<template>
  <form>
    <app-fieldset id="play_modes_selection" legendText="Select player mode">
      <div class="play_modes">
        <app-radio
          v-for="(radio, index) in radioButtons"
          :key="index"
          :id="radio.id"
          :labelText="radio.label"
          :name="radio.name"
          @change="onChange(radio.id)"
          @keydown.enter="onChange(radio.id)"
          :checked="playMode === radio.id"
        />
      </div>
    </app-fieldset>
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
.play_modes {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1rem 1rem 1rem;
  gap: 0.5rem;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 1rem;
}

fieldset {
  padding-bottom: 1.2rem;
}

@media screen and (max-width: 600px) {
  .play_modes {
    gap: 2.5rem;
  }

  form {
    font-size: 1.2rem;
  }
}
</style>
