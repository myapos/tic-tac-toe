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
  height: 15px;
  position: relative;
  padding: 0.5rem;
}
.radio > input {
  position: absolute;
  top: 45%;
  transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 1.2rem;
  height: 1.2rem;
}
.radio > label {
  position: absolute;
  top: 50%;
  left: 35%;
  transform: translate(-50%, -50%);
}
</style>
