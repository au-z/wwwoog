<template>
  <div class="synth" :style="`width: ${dims.W}px; height: ${dims.H}px`">
    <synth-debug></synth-debug>
    <synth-rack :modules="modules" :key="moduleKey"></synth-rack>
    <synth-keyboard></synth-keyboard>
  </div>
</template>

<script>
import SynthRack from './vue/rack/SynthRack'
import SynthKeyboard from './vue/keyboard/SynthKeyboard'
import SynthDebug from './vue/SynthDebug'

export default {
  name: 'synth',
  components: {SynthRack, SynthKeyboard, SynthDebug},
  data: () => ({
    modules: [
      'OscillatorModule',
      'EnvelopeModule',
      'GainModule',
    ],
    dims: {W: 800, H: 400},
  }),
  computed: {
    moduleKey() {
      return JSON.stringify(this.modules)
    },
  },
  methods: {
    connectRack(rackInput) {
      console.log(rackInput)
    }
  }
}
</script>

<style lang="stylus">
@require './style/mixins.styl'
@import url('https://fonts.googleapis.com/css?family=Varela+Round|Open+Sans:300')

*, *:before, *:after
  box-sizing: border-box

html, body
  margin: 0
  padding: 0
  font-family: "Open Sans", sans-serif
  color: #bbb
  body
    height: 100%
    margin: 0
    background-repeat: no-repeat
    background-attachment: fixed
    gradient(127deg, #fffdfd 20%, darken(#fffafa, 3%))
</style>

<style lang="stylus" scoped>
.synth
  background: #fafafa
</style>

