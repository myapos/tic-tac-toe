<template>
  <custom-button @click="toggleGrid" dataTestId="load-grid-btn">{{
    isToggled ? 'Load Default Grid' : 'Load Large Grid'
  }}</custom-button>
</template>
<script lang="ts">
export default {
  name: 'LoadDefaultGrid',
  computed: {
    isToggled() {
      const hasCustomGridDimensions = Boolean(Object.keys(this.$route.query).length)
      return hasCustomGridDimensions
    }
  },
  methods: {
    toggleGrid() {
      if (this.isToggled) {
        this.$router.push('/')
        return
      }
      this.$router.push('/reset-params?N=4&M=4')
    }
  }
}
</script>
