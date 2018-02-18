<template>
  <div class="key"
    :class="[`
      k:${keyData.index}`,
      keyData.name,
      {black: keyData.black},
    ]"
    @click="() => $emit('keypress', {name: keyData.name, frequency})"
  ></div>
</template>

<script>
export default {
  name: 'key',
  props: ['keyData'],
  computed: {
    frequency() {
      return this.$ft.toHz(this.keyData.name)
    },
  },
  mounted() {
    this.addComputedStyles(this.$el)
  },
  methods: {
    addComputedStyles(el) {
      el.setAttribute('style', `
        left: ${this.keyData.dims.x}px;
        width: ${this.keyData.dims.W}px;
        height: ${this.keyData.dims.H}
      `)
    },
  },
}
</script>

<style lang="stylus" scoped>
.key
  position: absolute
  left: 0
  top: 0
  background: white
  background: #f3f3f3
  border-bottom-left-radius: 5px
  border-bottom-right-radius: 5px
  box-shadow: 0 1px 1px 1px #cacaca
  cursor: pointer
  &.black
    background: #444
    height: 110px
    z-index: 1000
    box-shadow: none
</style>

