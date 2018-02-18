<template>
  <div class="synth-debug">
    <ul>
      <li v-if="$ac"><wave-icon></wave-icon></li>
    </ul>
  </div>
</template>

<script>
import WaveIcon from './icons/WaveIcon'

export default {
  name: 'synth-debug',
  components: {WaveIcon},
}
</script>

<style lang="stylus" scoped>
@require '../style/mixins.styl'

PI = 3.14159265

.synth-debug
  position: fixed
  bottom: 0
  right: 0
  ul
    list-style: none
    margin: 0
    padding: 0
    li
      position relative
      square(40px)
      float: left
      display: flex
      justify-content: center 
      align-items center
      font-size 1.5em
      color: #444
      margin: 8px
</style>
