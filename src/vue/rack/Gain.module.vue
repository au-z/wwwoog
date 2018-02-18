<template>
  <div class="gain-module">
    <div class="interface" :title="displayGain">
      <knob @twist="setGain"></knob>
    </div>
    <span>{{displayGain}}</span>
  </div>
</template>

<script>
export default {
  name: 'gain-module',
  data: () => ({
    gain: 0,
    gainNode: null,
  }),
  computed: {
    displayGain() {
      return parseInt(this.gain * 100, 10)
    },
  },
  created() {
    this.gainNode = this.$ac.createGain()
    this.gainNode.gain.value = this.gain
    this.$watch('gain', (gain) => this.gainNode.gain.value = gain)
    this.$emit('module-ready', this.gainNode)
  },
  methods: {
    setGain(gain) {
      this.gain = gain
      this.gainNode.gain.value = gain
    },
  },
}
</script>

<style lang="stylus" scoped>
.gain-module
  width: 100px
  height: 300px
  span
    font-size: 2em
    display: flex
    justify-content: center
  .interface
    position relative
    padding: 36px 12px
    display: flex
    justify-content: center
</style>
