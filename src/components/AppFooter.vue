<template>
  <footer>
    <span class="footer-row"
      >@2024 - version {{ version }}. Coded with
      <external-link to="https://vuejs.org/" aria-label="Visit Vue documentation" class="vue-icon"
        ><icon-vue /></external-link
    ></span>
    <span class="footer-row">
      The code is available on<external-link
        to="https://github.com/myapos"
        aria-label="Go to Myron Apostolakis Github repo"
      >
        GitHub
      </external-link>
    </span>
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

.footer-row {
  display: flex;
  align-items: center;
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
    font-size: 1.2rem;
    flex-direction: column;
  }
}
</style>
