<template>
  <form>
    <div class="row">
      <app-checkbox
        id="enable_single_player_mode"
        labelText="Enable 1P mode"
        :checked="isInSinglePlayerMode"
        @change="onChange"
      />
    </div>
  </form>
</template>
<script lang="ts">
import type { PropType } from 'vue'

export default {
  name: 'SinglePlayerMode',
  props: {
    isInSinglePlayerMode: {
      type: Boolean,
      required: true
    },
    setIsInSinglePlayerMode: {
      type: Function as PropType<(value: boolean) => void>,
      required: true
    }
  },
  methods: {
    onChange(e: Event) {
      if (e.target instanceof HTMLInputElement) {
        this.$props.setIsInSinglePlayerMode(e.target.checked)
      }
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
    gap: 0.5rem;
  }

  input[type='checkbox'] {
    width: 1.2rem;
    height: 1.2rem;
  }
}
</style>
