/**
 * Creates an audio interface between a playable interface and the rack
 */

/* eslint-disable require-jsdoc */
let Interface = (function() {
  let instance

  let fn = {}

  function register(namespace, methods) {
    fn[namespace] = {...fn[namespace], ...methods}
  }

  function init() {
    instance = {
      register,
      fn,
      NOTEON: 'NOTEON',
      NOTEOFF: 'NOTEOFF',
    }
    return instance
  }

  return {
    instance: () => (!instance) ? init() : instance,
  }
})()

export default Interface
