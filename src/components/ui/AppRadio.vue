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
  height: 1rem;
}
.radio > label {
  margin-left: 1rem;
}
</style>
