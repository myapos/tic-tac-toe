<template><custom-button :onClick="onReset">Reset Game</custom-button></template>

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
