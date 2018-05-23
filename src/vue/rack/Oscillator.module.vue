<template>
  <div class="oscillator">
    <div class="interface">
      <div class="waveforms">
        <ul>
          <li v-for="w in osc.waveforms" :key="w">
            <div class="waveform"
              :class="[{active: osc.type === w}, w]"
              @click="setWaveform(w)"
            ><svg-icon :url="`/static/svg/${w}.svg`"></svg-icon></div>
          </li>
        </ul>
      </div>
      <!-- <div class="envelope" id="envelope"></div> -->
      <div class="envelope">
        <slider class="pack-col slider-a"
          v-model="env.params.a" label="Attack"></slider>
        <slider class="pack-col slider-d"
          v-model="env.params.d" label="Delay"></slider>
        <slider class="pack-col slider-s"
          v-model="env.params.s" label="Sustain"></slider>
        <slider class="pack-col slider-r"
          v-model="env.params.r" label="Release" :invert="true"></slider>
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
    env: {
      on: null,
      off: null,
      node: v.$ac.createGain(),
      params: {
        a: 0.2,
        d: 0.3,
        s: 0.7,
        r: 0.2,
      },
    },
  }),
  created() {
    this.osc.node.type = this.osc.type
    this.osc.node.start(0) // start immediately
    this.env.node.gain.setValueAtTime(0.0, this.$acNow())
    this.env = {...this.env, ...new Envelope(this.$ac, this.env.node.gain)}
    this.osc.node.connect(this.env.node)

    // define an interface for the oscillator note
    Interface.register('keyboard', {
      [Interface.NOTEON]: this.noteOn,
      [Interface.NOTEOFF]: this.noteOff
    })
    this.$emit('module-ready', {in: this.osc.node, out: this.env.node})
  },
  mounted() {
    // new DrawEnvelope(this.$el, 'envelope', {params: this.env.params})
  },
  methods: {
    setGain(gain) {
      this.env.node.gain.setValueAtTime(gain, this.$acNow())
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
      this.env.on(this.env.params.a, this.env.params.d, this.env.params.s)
    },
    noteOff(freq) {
      this.osc.node.frequency.cancelScheduledValues(0)
      this.osc.node.frequency.setValueAtTime(freq, this.$acNow())
      this.env.off(this.env.params.r)
    },
  }
}
</script>

<style lang="stylus" scoped>
@require '../../style/mixins.styl'

envelopeTip(label)
  tipNumber(label, transparent, false)
  transform: rotate(90deg)
  left: 250%
  top: 30%
  font-size: 0.6em

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
    display: flex
    justify-content: space-between
    align-items: center
    // background: #333
    // gradient(-30deg, #333, #444)
    border-radius: 4px
    &:before
      outline(-4px, 2px solid #ddd)
    &:after
      tipNumber(2, #fff)
    div.pack-col
      transform-origin: 100% 120%
      transform: rotate(-90deg)
      &.slider-a:after
        envelopeTip('A')
      &.slider-d:after
        envelopeTip('D')
      &.slider-s:after
        envelopeTip('S')
      &.slider-r:after
        envelopeTip('R')
      
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

