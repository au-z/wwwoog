<template>
  <div class="module">
    <component :is="component" :id="`module_${moduleIndex}`"
      @module-ready="requestInstall"
    ></component>
  </div>
</template>

<script>
import EnvelopeModule from './Envelope.module'
import GainModule from './Gain.module'
import OscillatorModule from './Oscillator.module'

export default {
  name: 'module',
  components: {
    EnvelopeModule,
    GainModule,
    OscillatorModule
  },
  props: ['component', 'moduleIndex'],
  methods: {
    requestInstall(nodes) {
      this.$emit('install-module', {
        name: this.component,
        index: this.moduleIndex,
        nodes,
      })
    },
  },
}
</script>

<style lang="stylus" scoped>
@require '../../style/mixins.styl'
.module
  height: 100%
  border-right: 2px solid #eee
  min-width: 50px
  gradient(#fafafa, lighten(#fafafa, 90%), lighten(#fafafa, 50%))
</style>
