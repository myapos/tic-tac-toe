<template>
  <custom-button @click="loadDefaultGrid" dataTestId="load-default-grid-btn"
    >Load Default Grid</custom-button
  >
</template>
<script lang="ts">
export default {
  name: 'LoadDefaultGrid',
  methods: {
    loadDefaultGrid() {
      this.$router.push('/')
    }
  }
}
</script>
