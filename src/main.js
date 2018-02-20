require('font-awesome/css/font-awesome.css')

import Vue from 'vue'
import App from './App'

import Knob from './vue/controls/Knob'
import SvgIcon from './vue/icons/SvgIcon'

// tune to A440
import FREQUENCY_TABLE from './audio/FrequencyTable'
const FrequencyTable = FREQUENCY_TABLE.instance(440)

if(!window.AudioContext && !window.webkitAudioContext) {
  throw new Error(':( AudioContext support required!')
}
const AudioContext = window.AudioContext || window.webkitAudioContext
const ac = new AudioContext()

/* eslint-disable require-jsdoc */
Vue.use({
  name: 'vue-inject',
  version: '1.0.0',
  install: (vue, options) => {
    options = options || {injectables: []}
    if(!vue) throw new Error('Vue not defined!')
    vue.mixin({
      beforeCreate() {
        options.injectables.forEach((i) => this[i.key] = i.val)
      },
    })
  },
}, {
  injectables: [
    {key: '$ac', val: ac},
    {key: '$acNow', val: () => ac.currentTime},
    {key: '$fetch', val: (url, options) => fetch(url, options).then((r) => r.json())},
    {key: '$ft', val: FrequencyTable},
  ],
})

Vue.component('knob', Knob)
Vue.component('svg-icon', SvgIcon)

new Vue({
  el: '#app',
  render: (h) => h(App),
})

// Font-awesome test
// document.body.innerHTML = '<i class="fa fa-question"></i>'
