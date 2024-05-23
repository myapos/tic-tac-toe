<template>
  <div
    class="grid-container"
    :style="containerStyles"
    data-testid="tic-tac-toe-grid"
    aria-live="polite"
  >
    <template v-for="(row, rowIdx) in grid" :key="rowIdx">
      <grid-cell
        :row="row"
        :grid="grid"
        :rowIdx="rowIdx"
        :onClick="handleClickCell"
        :hasClickEnabled="!isInAutoPlayerMode"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { mapState } from 'pinia'
import { defineComponent, nextTick } from 'vue'

import GridCell from './ui/GridCell.vue'

import { useGameStore } from '@/stores/gameStore'

export default defineComponent({
  emits: ['click-cell'],
  components: { GridCell },
  name: 'DisplayGrid',
  data() {
    return {
      containerStyles: {}
    }
  },
  computed: {
    ...mapState(useGameStore, ['isInAutoPlayerMode', 'grid'])
  },
  methods: {
    handleClickCell(args: { rowIdx: number; colIdx: number }) {
      if (!this.isInAutoPlayerMode) {
        this.$emit('click-cell', args)
      }
    },
    updateContainerStyles() {
      const size = getComputedStyle(document.documentElement).getPropertyValue('--grid-cell-size')
      this.containerStyles = {
        gridTemplateColumns: `${size} `.repeat(this.grid.length),
        gridTemplateRows: `${size} `.repeat(this.grid.length)
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.updateContainerStyles)
    nextTick(this.updateContainerStyles)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateContainerStyles)
  }
})
</script>

<style scoped>
.grid-container {
  display: grid;
  border: 0px;
}
</style>
