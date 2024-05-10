<template>
  <div>{{ feedback }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    feedback: {
      type: String,
      required: true
    },
    M: {
      type: Number
    }
  },
  name: 'GetFeedback',
  data() {
    return {
      showDetails: false
    }
  },
  methods: {
    toggleDetails() {
      this.showDetails = !this.showDetails
    }
  }
})
</script>

<style scoped>
.info {
  font-size: 0.8rem;
  color: lightgrey;
  border: 1px solid green;
  padding: 5px;
  border-radius: 5px;
}
</style>
