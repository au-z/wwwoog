<template>
  <div class="wave-icon">
    <div></div><div></div>
    <div></div><div></div>
    <div></div><div></div>
    <div></div><div></div>
    <div></div><div></div>
    <div></div><div></div>
    <div></div><div></div>
    <div></div><div></div>
    <div></div><div></div>
    <div></div><div></div>
    <div></div><div></div>
    <div></div><div></div>
    <div></div><div></div>
    <div></div><div></div>
  </div>
</template>

<script>
export default {name: 'wave-icon'}
</script>

<style lang="stylus" scoped>
@require '../../style/mixins.styl'

.wave-icon
  $dim = 40
  $limit = 28
  $rad = 3
  $amplitude = 10

  position relative
  square($dim px)
  & > div
    position absolute
    square($rad px)
    background: #f55
  for $i in (1..$limit)
    & > div:nth-child({$i})
      left: (($dim - $limit) / 2)  - ($rad / 2) + $i px
      top: ($dim / 2) + 4 * cos($i / PI) - ($rad / 2) px
      animation: wave 2s infinite ease-in-out
      animation-delay: $i * 0.2s
  @keyframes wave {
    0%, 100% {
      margin-top: -1 * ($amplitude / 2) px
    }
    50% {
      margin-top: ($amplitude / 2) px
    }
  }
</style>



