<template>
  <custom-button :onClick="onReset" dataTestId="reset-btn">Reset Game</custom-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    onReset: {
      type: Function,
      required: true
    }
  },
  name: 'ResetGame'
})
</script>
