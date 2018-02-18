<template>
  <div class="synth-keyboard">
    <keyboard-key v-for="(k, i) in keys" :key="i"
      :keyData="{
        name: k,
        index: i,
        black: blackKey(k),
        dims: dimsProp(k, i),
      }"
      @keypress="handleKeypress"
    ></keyboard-key>
  </div>
</template>

<script>
import KeyboardKey from './KeyboardKey';

const keys = [
  'A3', 'As3', 'B3', 'C4', 'Cs4', 'D4', 'Ds4', 'E4', 'F4', 'Fs4', 'G4', 'Gs4',
  'A4', 'As4', 'B4', 'C5', 'Cs5', 'D5', 'Ds5', 'E5', 'F5', 'Fs5', 'G5', 'Gs5',
  'A5', 'As5', 'B5',
]

export default {
  name: 'synth-keyboard',
  components: {KeyboardKey},
  data() {
    return {
      keys,
      keyX: [],
      keyDims: {
        white: {W: 50, H: '100%'},
        black: {W: 30, H: '70%'},
      },
    }
  },
  created() {
    this.keyX = this.calcKeysX(this.keys)
  },
  methods: {
    dimsProp(keyName, index) {
      return {
        x: this.keyX[index],
        ...((this.blackKey(keyName)) ? this.keyDims.black : this.keyDims.white)
      }
    },
    blackKey(keyName) {
      const match = /^([a-gA-G]{1})([fs]{0,1})([0-9]){1}$/i.exec(keyName)
      return (match[2] !== '')
    },
    calcKeysX(keys) {
      let currX = 0
      return keys.map((k) => {
        const black = this.blackKey(k)
        const x = (black) ? currX - this.keyDims.black.W / 2 : currX
        currX += (black) ? 0 : this.keyDims.white.W
        return x
      })
    },
    handleKeypress(data) {
      
      console.log(data)
    },
  },
}
</script>

<style lang="stylus" scoped>
.synth-keyboard
  position: relative
  min-height: 200px
  display: flex
  justify-content: center
  background: #ccc
  border-top: 2px solid #eee
</style>