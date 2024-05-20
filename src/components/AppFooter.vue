<template>
  <footer>
    @2024 - version {{ version }}. Coded with
    <a href="https://vuejs.org/" target="_blank" class="vue-icon"><icon-vue /></a>
    by <a href="https://github.com/myapos" target="_blank">Myron Apostolakis</a>
  </footer>
</template>
<script>
import IconVue from './icons/IconVue.vue'
import packageJson from '../../package.json'
export default {
  name: 'AppFooter',
  components: {
    IconVue
  },
  computed: {
    version() {
      return packageJson.version
    }
  }
}
</script>
<style scoped>
footer {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
}
.vue-icon svg {
  height: 25px;
  width: 25px;
}
.vue-icon:hover {
  background: none;
}

@media (max-width: 600px) {
  footer {
    font-size: 0.9rem;
  }
}
</style>
