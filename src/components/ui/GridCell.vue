<template>
  <div
    v-for="(mark, colIdx) in row"
    :key="colIdx"
    :class="buildClassNames({ rowIdx, colIdx, length: grid.length })"
    @click="onClick({ rowIdx, colIdx })"
    @keydown.enter="onClick({ rowIdx, colIdx })"
    :data-testid="`cell-${rowIdx}-${colIdx}`"
    role="button"
    :aria-label="getAriaLabel({ rowIdx, colIdx, mark })"
    tabindex="0"
  >
    {{ mark[0] || '' }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import type { rowT, gridT } from '../types'

import { W } from '@/constants'

interface buildClassNamesI {
  rowIdx: number
  colIdx: number
  length: number
}

export default defineComponent({
  name: 'GridCell',
  data() {
    return {
      winningRange: {
        startRow: 1,
        endRow: 3,
        startWinCol: 1,
        endWinCol: 3,
        mode: 'primary'
      }
    }
  },
  props: {
    row: {
      type: Array as () => rowT,
      required: true
    },
    grid: {
      type: Array as () => gridT,
      required: true
    },
    rowIdx: {
      type: Number,
      required: true
    },
    onClick: {
      type: Function,
      required: true
    },
    hasClickEnabled: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    isWinningCell({ rowIdx, colIdx }: buildClassNamesI): boolean {
      return this.grid[rowIdx][colIdx][1].includes(W)
    },
    buildClassNames({ rowIdx, colIdx, length }: buildClassNamesI): string {
      let classes = !this.hasClickEnabled ? 'grid-cell disable-click' : 'grid-cell'
      const isFirstRow = rowIdx === 0
      const isLastRow = rowIdx === length - 1
      const isFirstCol = colIdx === 0
      const isLastCol = colIdx === length - 1

      if (this.isWinningCell({ rowIdx, colIdx, length })) {
        return classes.concat(' grid-cell-winning')
      }

      if (isFirstRow && isFirstCol) {
        return classes.concat(' first-row first-col')
      }

      if (isFirstRow && isLastCol) {
        return classes.concat(' first-row last-col')
      }

      if (isLastRow && isFirstCol) {
        return classes.concat(' last-row first-col')
      }

      if (isLastRow && isLastCol) {
        return classes.concat(' last-row last-col')
      }

      if (isFirstRow) {
        return classes.concat(' first-row')
      }

      if (isLastRow) {
        return classes.concat(' last-row')
      }

      if (isFirstCol) {
        return classes.concat(' first-col')
      }

      if (isLastCol) {
        return classes.concat(' last-col')
      }

      return classes
    },
    getAriaLabel({ rowIdx, colIdx, mark }: { rowIdx: number; colIdx: number; mark: any }): string {
      return `Row ${rowIdx + 1}, Column ${colIdx + 1}, ${mark[0] ? mark[0] : 'empty'}`
    }
  }
})
</script>

<style scoped>
.grid-cell {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: var(--border);
  border-right: var(--border);
  font-size: 1.3rem;
  padding: 2rem;
  background-color: var(--vt-c-black-soft);
}

.grid-cell:hover {
  background-color: var(--vt-c-text-light-1);
  cursor: pointer;
}

.disable-click {
  pointer-events: none;
}

.grid-cell.last-row {
  border-bottom: 0px;
}

.grid-cell.last-col {
  border-right: 0px;
}

.grid-cell-winning {
  background-color: var(--vt-c-text-light-1);
}

@media (max-width: 600px) {
  .grid-cell {
    padding: 0;
    font-size: 1.5rem;
  }
}
</style>
