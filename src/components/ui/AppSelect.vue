<template>
  <label :for="id" v-show="hasLabel">{{ labelText }}</label>
  <select :id="id" @input="updateValue">
    <option v-for="option in options" :key="option" :value="option">
      {{ option }}
    </option>
  </select>
</template>
<script lang="ts">
export default {
  name: 'AppSelect',
  props: {
    labelText: {
      default: '',
      String: true
    },
    id: {
      default: '',
      String: true
    },
    options: {
      required: true,
      type: Object
    }
  },
  emits: ['update:selectValue'],
  computed: {
    hasLabel() {
      return this.labelText.length > 0
    }
  },
  methods: {
    updateValue(event: Event) {
      const target = event.target as HTMLSelectElement
      this.$emit('update:selectValue', target.value)
    }
  }
}
</script>
<style scoped>
form {
  display: flex;
  flex-direction: column;
}

form label {
  font-size: 0.9rem;
  color: var(--vt-c-white-mute);
  margin-bottom: 0.5em;
}

form select {
  font-size: 1.1rem;
  padding: 0.2rem;
  border-radius: 0.2rem;
  width: 100%;
  background-color: var(--vt-c-divider-dark-1);
  color: var(--vt-c-white-mute);
}
</style>
