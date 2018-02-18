<template>
  <div class="svg-icon" v-html="icon"></div>
</template>

<script>
export default {
  name: 'svg-icon',
  props: ['url'],
  data: () => ({icon: ''}),
  created() {
    const handleError = (e) => '<i class="fa fa-times-circle error"></i>'
    fetch(this.url).then((r) => r.ok ? r.text() : handleError(r)).then((svg) => this.icon = svg)
  },
}
</script>

<style lang="stylus">
div.svg-icon i.fa.error
  color: #ccc
div.svg-icon i.spin
  animation spin 1.4s infinite linear
@keyframes spin {
  100% {
    transform: rotate(360deg)
  }
}
</style>

