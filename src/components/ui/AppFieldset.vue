<template>
  <fieldset :id="id">
    <legend v-show="hasLegend">{{ legendText }}</legend>
    <slot></slot>
  </fieldset>
</template>

<script lang="ts">
export default {
  name: 'AppFieldset',
  props: {
    id: {
      type: String,
      required: true
    },
    legendText: {
      type: String
    }
  },
  computed: {
    hasLegend() {
      return this.legendText !== undefined
    }
  }
}
</script>
<style scoped>
fieldset {
  padding-bottom: 1.2rem;
}

@media screen and (max-width: 600px) {
  legend {
    font-size: 1rem;
  }

  fieldset {
    padding-bottom: 2rem;
  }
}
</style>
