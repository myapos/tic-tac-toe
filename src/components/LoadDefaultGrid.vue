<template>
  <custom-button @click="loadDefaultGrid" dataTestId="load-default-grid-btn" :disabled="!isEnabled"
    >Load Default Grid</custom-button
  >
</template>
<script lang="ts">
export default {
  name: 'LoadDefaultGrid',
  computed: {
    isEnabled() {
      const hasCustomGridDimensions = Boolean(Object.keys(this.$route.query).length)
      return hasCustomGridDimensions
    }
  },
  methods: {
    loadDefaultGrid() {
      this.$router.push('/')
    }
  }
}
</script>
