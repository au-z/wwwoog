import EnvelopeModule from './Envelope.module'
import GainModule from './Gain.module'
import OscillatorModule from './Oscillator.module'

export default {
  name: 'module',
  components: {
    EnvelopeModule,
    GainModule,
    OscillatorModule,
  },
  props: {
    component: String,
    index: Number,
  },
  computed: {
    id() {
      return `module_${this.index}`
    },
  },
  methods: {
    install(nodes) {
      this.$emit('install-module', {
        name: this.component,
        index: this.index,
        nodes,
      })
    },
  },
}
