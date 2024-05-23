<template>
  <button
    ref="buttonRef"
    @click="onClick"
    :data-testid="dataTestId"
    :disabled="disabled"
    :class="{ highlight: shouldFocus }"
  >
    <slot></slot>
  </button>
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
    },
    shouldFocus: {
      type: Boolean,
      default: false
    }
  }
})
</script>
<style scoped>
button {
  width: 10rem;
  height: 4rem;
  display: block;
  background: none;
  border: 1px solid var(--vt-c-indigo);
  color: var(--vt-c-white-mute);
  border-radius: 5px;
  font-size: 1rem;
  padding: 0.5rem;
}

button:hover {
  cursor: pointer;
  filter: brightness(150%);
  border-color: var(--vt-c-divider-dark-2);
}

button:disabled:hover {
  cursor: not-allowed;
  background-color: var(--vt-c-divider-dark-1);
  filter: brightness(100%);
}
button[disabled] {
  border: 1px solid black;
  background-color: var(--vt-c-divider-dark-1);
}

.highlight {
  border-color: var(--highlight-color);
}

@media (max-width: 600px) {
  button {
    font-size: 1.2rem;
    padding: 1.2rem;
    width: 10rem;
    height: 5rem;
  }
}
</style>
