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
      radioButtons: [
        { value: '1P', label: '1P', id: '1P', name: 'play_mode' },
        { value: '2P', label: '2P', id: '2P', name: 'play_mode' },
        { value: 'Auto', label: 'Auto', id: 'Auto', name: 'play_mode' }
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
