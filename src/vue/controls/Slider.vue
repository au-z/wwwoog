<template>
  <div class="slider" :class="{vertical}">
    <input class="range" type="range" ref="slider" :title="label"
      :min="0.0" :max="1.0" step="0.01"
      :value="value" @input="input"/>
  </div>
</template>

<script>
import DragSlide from './DragSlide';

export default {
  name: 'slider',
  props: {
    vertical: {default: true},
    value: {type: Number, default: 0.0, required: true},
    invert: {type: Boolean, default: false},
    label: String,
    type: {default: ''},
    initPct: {default: 0.0},
    ticks: {default: true},
    showPct: {default: false},
  },
  data: () => ({
    pct: 0,
    dragHandler: null,
  }),
  mounted() {
    this.dragHandler = new DragSlide(this.$el, this.handleUpdate, {})
  },
  methods: {
    input() {
      this.$emit('input', parseFloat(this.$refs.slider.value));
    },
  },
}
</script>

<style lang="stylus" scoped>
@require '../../style/mixins.styl'

$light_color = lighten(#f44, 20%)

.slider
  position: relative
  height: 23px
  width: 100%
  display: flex
  align-items: center
  &.vertical
    // transformOrigin(50%, 100%)
    // transform: rotate(-90deg)
  input.range
    position: absolute
    -webkit-appearance: none
    height: 2px
    width: 70px
    background: #ddd
    z-index: 100
    outline-color: transparent
    outline-style: none
    &::-webkit-slider-thumb
      -webkit-appearance: none
      background-color: $light_color
      circle(12px)
      border: 1em transparent
      cursor: pointer
      box-shadow: 0.2em 0 .1em .05em rgba(255,255,255,0.1) inset, .06em 0 .04em .02em rgba(90,90,90,.5) inset
</style>
