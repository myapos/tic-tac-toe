<template>
  <custom-button :onClick="onReset" dataTestId="reset-btn">Reset Game</custom-button>
</template>

<script lang="ts">
export default {
  props: {
    onReset: {
      type: Function,
      required: true
    }
  },
  name: 'ResetGame'
}
</script>
