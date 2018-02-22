<template>
  <div class="synth-keyboard">
    <keyboard-key v-for="(k, i) in keys" :key="i"
      :keyData="{
        name: k,
        index: i,
        black: blackKey(k),
        dims: dimsProp(k, i),
      }"
      :keyMap="findKeyMap(k)"
      @keydown="keydown"
      @keyup="keyup"
    ></keyboard-key>
  </div>
</template>a

<script>
import Vue from 'vue'
import KeyboardKey from './KeyboardKey'
import QuertyMap from './QuertyMap'
import INTERFACE from '../../audio/Interface'
const Interface = INTERFACE.instance()

const keys = [
  'A3', 'As3', 'B3', 'C4', 'Cs4', 'D4', 'Ds4', 'E4', 'F4', 'Fs4', 'G4', 'Gs4',
  'A4', 'As4', 'B4', 'C5', 'Cs5', 'D5', 'Ds5', 'E5', 'F5', 'Fs5', 'G5', 'Gs5',
  'A5', 'As5', 'B5',
]

export default {
  name: 'synth-keyboard',
  components: {KeyboardKey},
  data: (v) => ({
    keys,
    keyX: [],
    keyDims: {
      white: {W: 50, H: '100%'},
      black: {W: 30, H: '70%'},
    },
    activeKeys: {},
    keyMap: new QuertyMap(keys, 'C4', v.keydown, v.keyup),
  }),
  created() {
    this.keyX = this.calcKeysX(this.keys)
  },
  methods: {
    findKeyMap(name) {
      return Object.keys(this.keyMap).find((k) => this.keyMap[k] === name)
    },
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
    keydown(data) {
      if(this.activeKeys[data.name]) return
      Interface.fn.keyboard.NOTEON(data.frequency)
      this.activeKeys[data.name] = data.frequency
      // monophonic synthesizer set pitch
    },
    keyup(data) {
      // turn off all notes on keyup
      Object.keys(this.activeKeys).forEach((k) => {
        Interface.fn.keyboard.NOTEOFF(this.activeKeys[k])
      })
      this.activeKeys = {}
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
