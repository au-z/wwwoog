require('font-awesome/css/font-awesome.css')

import Vue from 'vue'
import App from './App'

import Knob from './vue/controls/Knob'

import FrequencyTable from './audio/frequencyTable'

// tune to A 440
FrequencyTable.instance(440)

if(!window.AudioContext && !window.webkitAudioContext) {
  throw new Error(':( AudioContext support required!')
}
const AudioContext = window.AudioContext || window.webkitAudioContext


/* eslint-disable require-jsdoc */
/* eslint-disable no-invalid-this */
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
    {key: '$ac', val: new AudioContext()},
    {key: '$fetch', val: (url, options) => fetch(url, options).then((r) => r.json())},
    {key: '$ft', val: FrequencyTable.instance()},
  ],
})

Vue.component('knob', Knob)

new Vue({
  el: '#app',
  render: (h) => h(App),
})

// Font-awesome test
// document.body.innerHTML = '<i class="fa fa-question"></i>'
