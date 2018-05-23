<template>
  <div class="synth-rack">
    <module v-for="(m, i) in modules" :key="m.name"
      :component="m"
      :index="i"
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
      modules.forEach((m, i) => {
        if(!m.nodes || (!m.nodes.in && !m.nodes.out)) {
          throw new Error(`This module does not expose a web audio node: ${modules[i]}`)
        }
        if(i === modules.length - 1) {
          m.nodes.out.connect(this.$ac.destination)
        } else {
          m.nodes.out.connect(modules[i + 1].nodes.in)
        }
      })
      return modules[0].nodes.in
    },
  },
  created() {
    const unwatch = this.$watch('installables', function(installables) {
      if(installables.every((module) => this.modules.includes(module.name))) {
        this.$ac.sourceNode = this.installModules(installables)
        unwatch()
        this.$emit('rack-ready')
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
  box-shadow: 0 1px 1px 1px #cacaca
  overflow: hidden
</style>
