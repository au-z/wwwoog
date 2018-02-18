<template>
  <div class="module">
    <component :is="component" :id="`module_${moduleIndex}`"
      @module-ready="requestInstall"
    ></component>
  </div>
</template>

<script>
import GainModule from './Gain.module'
import OscillatorModule from './Oscillator.module'

export default {
  name: 'module',
  components: {GainModule, OscillatorModule},
  props: ['component', 'moduleIndex'],
  methods: {
    requestInstall(node) {
      this.$emit('install-module', {
        name: this.component,
        index: this.moduleIndex,
        node,
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
.module
  height: 100%
  border-right: 2px solid #eee
  min-width: 50px
</style>
