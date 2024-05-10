<template>
  <button @click="onClick"><slot></slot></button>
</template>
<script lang="ts">
export default {
  name: 'CustomButton',
  props: {
    onClick: {
      type: Function as PropType<(event: MouseEvent) => void>,
      required: true
    }
  }
}
</script>
<style scoped>
button {
  width: 100px;
  height: 50px;
  display: block;
  background: none;
  border: 1px solid grey;
  outline: 1px;
  color: lightgrey;
  border-radius: 5px;
}

button:hover {
  cursor: pointer;
  filter: brightness(150%);
  border-color: green;
}
</style>
