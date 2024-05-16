<template>
  <form>
    <div class="row">
      <fieldset id="play_modes">
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
import type { PropType } from 'vue'

import { playModes } from '@/constants'

export default {
  name: 'PlayerModes',
  props: {
    playMode: {
      type: String,
      required: true
    },
    setPlayMode: {
      type: Function as PropType<(value: string) => void>,
      required: true
    }
  },
  data() {
    return {
      radioGroup: 'play_mode',
      radioButtons: [
        {
          value: playModes.SINGLE_PLAYER,
          label: playModes.SINGLE_PLAYER,
          id: playModes.SINGLE_PLAYER,
          name: this.radioGroup
        },
        {
          value: playModes.TWO_PLAYER,
          label: playModes.TWO_PLAYER,
          id: playModes.TWO_PLAYER,
          name: this.radioGroup
        },
        {
          value: playModes.AUTO_PLAYER,
          label: playModes.AUTO_PLAYER,
          id: playModes.AUTO_PLAYER,
          name: this.radioGroup
        }
      ]
    }
  },
  methods: {
    onChange(id: string) {
      console.log('id', id)
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
