<template>
  <div data-testid="feedback">{{ feedback }}</div>
</template>

<script lang="ts">
import { mapState } from 'pinia'
import { defineComponent } from 'vue'

import { useGameStore } from '@/stores/gameStore'

export default defineComponent({
  props: {
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
  computed: {
    ...mapState(useGameStore, ['feedback'])
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
