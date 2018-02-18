<template>
  <div class="knob">
    <div class="wheel"></div>
    <span v-if="showPct" class="current">{{this.pct}}</span>
    <span class="min">Min</span>
    <span class="max">Max</span>

    <div v-if="ticks" class="ticks">
      <div class="tick activetick"></div>
      <div class="tick"></div>
      <div class="tick"></div>
      <div class="tick"></div>
      <div class="tick"></div>
      <div class="tick"></div>
      <div class="tick"></div>
      <div class="tick"></div>
      <div class="tick"></div>
      <div class="tick"></div>
      <div class="tick"></div>
      <div class="tick"></div>
      <div class="tick"></div>
    </div>
  </div>
</template>

<script>
import ScrollRotate from './ScrollRotate'

export default {
  name: 'knob',
  props: {
    ticks: {
      required: false,
      default: true,
    },
    showPct: {
      require: false,
      default: false,
    },
  },
  data: () => ({
    pct: 0,
    scrollHandler: null,
    scrollRotateOptions: {
      rotateMin: 0,
      rotateMax: 240,
      startAngle: 0,
      tickDegStep: 20,
    },
  }),
  mounted() {
    this.scrollHandler = new ScrollRotate(this.$el, this.handleUpdate, this.scrollRotateOptions)
  },
  methods: {
    handleUpdate(knobPct) {
      this.pct = knobPct
      this.$emit('twist', this.pct)
    },
  },
}
</script>

<style lang="stylus" scoped>
@require '../../style/mixins.styl'

$knob_color = #f7f7f7
$light_color = lighten(#f44, 20%)
$knob_size = 3.5em

.knob
  position relative
  background-color: grey
  width: $knob_size
  height: $knob_size
  border-radius: 50%

  display: flex
  justify-content: center
  align-items: center

  border: solid 2px darken(#eee, 4%)
  gradient($knob_color, lighten($knob_color, 5%), darken($knob_color, 5%))
  box-shadow: 0 .2em .1em .05em rgba(255,255,255,0.1) inset, 0 -.2em .1em .05em rgba(90,90,90,.5) inset
  overflow: visible
  .wheel
    position: absolute
    width: 100%
    height: 100%
    border-radius: 50%

    // animate transform 0deg to 240deg
    transform: rotate(0deg)
    &::before
      content: ""
      position: absolute
      bottom: 29%
      left: 17%
      width: 7%
      height: 7%
      background-color: $light_color
      border-radius: 50%
      box-shadow: 0 0 .4em 0 darken($light_color, 10%)
  span.current
    margin-top: -3px
    color: #ccc
    font-size: 0.8em
    display: inline-block
  span.min,
  span.max
    display: block
    color: #aaa
    text-transform: uppercase
    -webkit-font-smoothing: antialiased
    font-size: 60%
    position: absolute
    bottom: -($knob_size / 3)
    user-select: none
  span.min
    left: -($knob_size / 2)
  span.max
    right: -($knob_size / 2)

  div.tick
    position: absolute
    width: 100%
    height: 100%
    top: 0
    left: 0
    z-index: 5
    overflow: visible
    &.active:after
      background-color: $light_color
      box-shadow: 0 0 0.2em .02em darken($light_color, 10%)
      transition: all 50ms ease-in
    &::after
      content: ""
      width: ($knob_size / 60)
      height: ($knob_size / 20)
      background-color: #aaa
      position: absolute
      top: -0.5em
      left: 50%
      transition: all 180ms ease-out

  // create ticks in arc
  $num_ticks = 13
  $tick_deg_step = 20
  $start_angle = -140
  arc($num_ticks, $tick_deg_step, $start_angle)
</style>
