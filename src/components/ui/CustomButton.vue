<template>
  <button @click="onClick" :data-testid="dataTestId"><slot></slot></button>
</template>
<script lang="ts">
export default {
  name: 'CustomButton',
  props: {
    onClick: {
      type: Function as PropType<(event: MouseEvent) => void>,
      required: true
    },
    dataTestId: {
      type: String,
      default: 'custom-button'
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
  border: 1px solid var(--vt-c-indigo);
  color: var(--color-background-soft);
  border-radius: 5px;
}

button:hover {
  cursor: pointer;
  filter: brightness(150%);
  border-color: var(--vt-c-divider-dark-2);
}
</style>
