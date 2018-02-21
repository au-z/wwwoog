<template>
  <div class="oscillator">
    <div class="interface">
      <div class="waveforms">
        <ul>
          <li v-for="w in osc.waveforms" :key="w">
            <div class="waveform"
              :class="[{active: osc.type == w}, w]"
              @click="setWaveform(w)"
            ><svg-icon :url="`/static/svg/${w}.svg`"></svg-icon></div>
          </li>
        </ul>
      </div>
      <div class="envelope" id="envelope">
      </div>
    </div>
  </div>
</template>

<script>
import Envelope from '../../audio/Envelope'
import INTERFACE from '../../audio/Interface'
import DrawEnvelope from '../../canvas/DrawEnvelope'
const Interface = INTERFACE.instance()

export default {
  name: 'oscillator',
  data: (v) => ({
    polyphony: 'mono',
    osc: {
      waveforms: ['sine', 'square', 'sawtooth', 'triangle'],
      type: 'sine',
      node: v.$ac.createOscillator(),
    },
    gain: {
      node: v.$ac.createGain(),
    },
    env: null,
    envParams: {
      a: 0.2,
      d: 0.3,
      s: 0.4,
      r: 0.4,
      velocity: 1,
    },
  }),
  created() {
    this.osc.node.type = this.osc.type
    this.osc.node.start(0) // start immediately
    this.gain.node.gain.setValueAtTime(0.0, this.$acNow())
    this.env = new Envelope(this.$ac, this.gain.node.gain)
    this.osc.node.connect(this.gain.node)


    // define an interface for the oscillator note
    Interface.register('keyboard', {
      [Interface.NOTEON]: this.noteOn,
      [Interface.NOTEOFF]: this.noteOff
    })
    this.$emit('module-ready', {in: this.osc.node, out: this.gain.node})
  },
  mounted() {
    new DrawEnvelope(this.$el, 'envelope', {params: this.envParams})
  },
  methods: {
    setGain(gain) {
      this.gain.node.gain.setValueAtTime(gain, this.$acNow())
    },
    setWaveform(type) {
      this.osc.type = type
      this.osc.node.type = this.osc.type
    },
    activeWaveform(key) {
      return key === this.osc.node.type
    },
    // --------------------------------
    // INTERFACE METHODS
    // --------------------------------
    noteOn(freq) {
      this.osc.node.frequency.cancelScheduledValues(0)
      this.osc.node.frequency.setValueAtTime(freq, this.$acNow())
      this.env.envGenOn(this.envParams.a, this.envParams.d, this.envParams.s)
    },
    noteOff(freq) {
      this.osc.node.frequency.cancelScheduledValues(0)
      this.osc.node.frequency.setValueAtTime(freq, this.$acNow())
      this.env.envGenOff(this.envParams.r)
    },
  }
}
</script>

<style lang="stylus" scoped>
@require '../../style/mixins.styl'

.oscillator
  width: 200px
  height: 100%
  .volume
    position: absolute
    right: 24px
    top: 16px
  .waveforms
    position: relative
    &:after
      tipNumber(1, #fff)
    ul
      margin: 0
      padding: 0
      list-style: none
      li
        margin: 0
        padding: 0
    div.waveform
      width: 24px
      height: 24px
      display: flex
      justify-content: center
      align-items: center
      border-radius: 5px
      color: #f44
      cursor: pointer
      transition: 500ms all
    span
      font-size: 2em
      display: flex
      justify-content: center
  .envelope
    position relative
    width: calc(100% - 48px)
    height: 92px
    background: #333
    gradient(-30deg, #333, #444)
    border-radius: 4px
    &:before
      outline(-4px, 2px solid #ddd)
  .interface
    position relative
    padding: 16px
    display: flex
    justify-content: space-between
</style>

<style lang="stylus">
.oscillator .waveform ul li div
  display: flex
  justify-content: center
  align-items: center
.oscillator .waveform svg
  display: block
  width: 20px
  height: 20px
.oscillator .waveform
  svg path
    stroke: #bbb
    stroke-width: 8
  &.active svg path
    stroke: #f44
    stroke-width: 14
.oscillator .waveform.sine
  svg path
    stroke-width: 16
  &.active svg path
    stroke-width: 28
</style>

