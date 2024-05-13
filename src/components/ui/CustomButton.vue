<template>
  <button @click="onClick" :data-testid="dataTestId" :disabled="disabled"><slot></slot></button>
</template>
<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CustomButton',
  props: {
    onClick: {
      type: Function as PropType<(event: MouseEvent) => void>,
      required: true
    },
    dataTestId: {
      type: String,
      default: 'custom-button'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
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

button:disabled {
  cursor: default;
  background-color: var(--vt-c-divider-dark-1);
}

button:disabled:hover {
  cursor: default;
  background-color: var(--vt-c-divider-dark-1);
  filter: brightness(100%);
}
</style>
