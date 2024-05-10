<template>{{ feedback }}</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    feedback: {
      type: String,
      required: true
    }
  },
  name: 'GetFeedback'
})
</script>
