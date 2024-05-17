<template>
  <div class="grid-container" :style="containerStyles" data-testid="tic-tac-toe-grid">
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
import { defineComponent } from 'vue'

import type { gridT } from './types'
import GridCell from './ui/GridCell.vue'

import { useGameStore } from '@/stores/gameStore'

export default defineComponent({
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
  computed: {
    ...mapState(useGameStore, ['isInAutoPlayerMode'])
  },
  methods: {
    handleClickCell(args: { rowIdx: number; colIdx: number }) {
      this.$emit('click-cell', args)
    }
  }
})
</script>

<style scoped>
.grid-container {
  display: grid;
  border: 0px;
}
</style>
