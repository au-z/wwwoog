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
      <div class="volume">
        <knob type="small" :initPct="gain.initPct" @twist="setGain" :ticks="false"></knob>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'oscillator',
  data: () => ({
    osc: {
      waveforms: ['sine', 'square', 'sawtooth', 'triangle'],
      type: 'triangle',
      node: null,
    },
    gain: {
      node: null,
      initPct: 0.5,
    },
  }),
  created() {
    this.osc.node = this.$ac.createOscillator()
    this.osc.node.type = this.osc.type
    this.osc.node.frequency.value = 200
    this.osc.node.start(this.$ac.currentTime)
    
    this.gain.node = this.$ac.createGain()
    this.gain.node.gain.value = 0.5

    this.osc.node.connect(this.gain.node)
    this.$emit('module-ready', {in: this.osc.node, out: this.gain.node})
  },
  methods: {
    setGain(gain) {
      this.gain.node.gain.value = gain
    },
    setWaveform(type) {
      this.osc.type = type
      this.osc.node.type = this.osc.type
    },
    activeWaveform(key) {
      console.log(this.osc.node.type)
      return key === this.osc.node.type
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
      tipNumber(1)
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
    gradient(0deg, darken(#fcfcfc, 2%), #fcfcfc, lighten(#fcfcfc, 4%))
    transition: 500ms all
  span
    font-size: 2em
    display: flex
    justify-content: center
  .interface
    position relative
    padding: 16px
    display: flex
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
    stroke-width: 10
  &.active svg path
    stroke: #f44
    stroke-width: 14
.oscillator .waveform.sine
  svg path
    stroke-width: 20
  &.active svg path
    stroke-width: 28
</style>

