<template>
  <div class="synth-rack">
    <module v-for="(m, i) in modules" :key="m.name"
      :component="m"
      :moduleIndex="i"
      @install-module="registerModuleInstall"
    ></module>
  </div>
</template>

<script>
import Module from './Module'

export default {
  name: 'synth-rack',
  components: {Module},
  props: ['modules'],
  data: () => ({
    installables: [],
  }),
  methods: {
    registerModuleInstall(data) {
      this.installables.push(data)
    },
    installModules(modules) {
      modules.sort((m) => m.index)
      for(var i = 0; i < modules.length; i++) {
        if(!modules[i].node) {
          throw new Error(`This module does not expose a web audio node: ${modules[i]}`)
        }
        if(i === modules.length - 1) {
          modules[i].node.connect(this.$ac.destination)
        } else {
          modules[i].node.connect(modules[i + 1].node)
        }
      }
    },
  },
  created() {
    const unwatch = this.$watch('installables', function(installables) {
      if(installables.every((module) => this.modules.includes(module.name))) {
        this.installModules(installables)
        unwatch()
      } else {
        throw new Error('A rack module has not requested installation.')
      }
    })
  },
}
</script>

<style lang="stylus" scoped>
.synth-rack
  height: 200px
  display: flex
  justify-content: start
  border-top-left-radius: 4px
  border-top-right-radius: 4px
  border: 2px solid #eee
  box-shadow: 0 2px 6px rgba(50, 55, 60, 0.4)
  overflow: hidden
</style>
