<template>
  <component class="module" :is="component" :id="id" @module-ready="install"></component>
</template>

<script>
import Module from './module.mixin'

export default {
  name: 'module',
  mixins: [Module],
}
</script>
