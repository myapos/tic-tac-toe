<template>
  <a :href="to" target="_blank" rel="noopener noreferrer"><slot></slot></a>
</template>
<script>
export default {
  name: 'ExternalLink',
  props: {
    to: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="ts"></style>
