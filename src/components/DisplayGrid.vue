<template>
  <div class="grid-container" :style="containerStyles" data-testid="tic-tac-toe-grid">
    <template v-for="(row, rowIdx) in grid" :key="rowIdx">
      <grid-cell :row="row" :grid="grid" :rowIdx="rowIdx" :onClick="handleClickCell"></grid-cell>
    </template>
  </div>
</template>

<script lang="ts">
import type { gridT } from './types'
import GridCell from './ui/GridCell.vue'

export default {
  props: {
    grid: {
      type: Array as () => gridT,
      required: true
    }
  },
  emits: ['click-cell'],
  components: { GridCell },
  name: 'DisplayGrid',
  data() {
    return {
      containerStyles: {
        gridTemplateColumns: '100px '.repeat(this.grid.length),
        gridTemplateRows: '100px '.repeat(this.grid.length)
      }
    }
  },
  methods: {
    handleClickCell(args: { rowIdx: number; colIdx: number }) {
      this.$emit('click-cell', args)
    }
  }
}
</script>

<style scoped>
.grid-container {
  display: grid;
  border: 0px;
}
</style>
