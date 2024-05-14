<template>
  <input :id="id" :name="id" type="checkbox" :checked="checked" @change="handleChange" />
  <label :for="id">{{ labelText }}</label>
</template>
<script lang="ts">
export default {
  name: 'AppCheckbox',
  emits: ['change'],
  props: {
    id: {
      type: String,
      required: true
    },
    labelText: {
      type: String,
      required: true
    },
    checked: {
      type: Boolean,
      default: false
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
input[type='checkbox'] {
  width: 1.2rem;
  height: 1.2rem;
}
</style>
