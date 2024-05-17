<template>
  <span class="radio">
    <input
      :id="id"
      :name="name"
      type="radio"
      :checked="checked"
      @change="handleChange"
      :data-testid="id"
    />
    <label :for="id">{{ labelText }}</label>
  </span>
</template>
<script lang="ts">
export default {
  name: 'AppRadio',
  emits: ['change'],
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    labelText: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: '2P'
    },
    checked: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    handleChange(event: Event) {
      this.$emit('change', event)
    }
  }
}
</script>
<style scoped>
.radio {
  display: flex;
  gap: 0.5rem;
}
input[type='checkbox'] {
  width: 1.2rem;
  height: 1.2rem;
}
</style>
