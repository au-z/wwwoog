<template>
  <div class="synth" :style="`width: ${dims.W}px; height: ${dims.H}px`">
    <synth-debug></synth-debug>
    <synth-rack :modules="[
      'OscillatorModule',
      'GainModule',
    ]"></synth-rack>
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
    dims: {W: 800, H: 400},
  }),
}
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Varela+Round|Open+Sans:300')

*, *:before, *:after
  box-sizing: border-box

html, body
  margin: 0
  padding: 0
  font-family: "Open Sans", sans-serif
  color: #bbb
</style>

<style lang="stylus" scoped>
.synth
  background: #fafafa
</style>

