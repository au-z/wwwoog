<template>
  <div class="oscillator">
    Oscillator
  </div>
</template>

<script>
export default {
  name: 'oscillator',
  data: () => ({
    osc: null,
  }),
  created() {
    this.osc = this.$ac.createOscillator()
    this.osc.type = 'triangle'
    this.osc.frequency.value = 200;
    this.osc.start(this.$ac.currentTime)
    this.$emit('module-ready', this.osc)
  }
}
</script>

<style lang="stylus" scoped>
.oscillator
  width: 200px
  height: 100%
  background: #f7d7d7
</style>
