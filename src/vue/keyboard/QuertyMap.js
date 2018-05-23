import FREQUENCY_TABLE from '../../audio/FrequencyTable'
const Ft = FREQUENCY_TABLE.instance(440)

/**
 * Generates a Querty keyboard mapping for your synthesizer
 * @param {Array} keys the keynames to map
 * @param {String} startKey a key to start mapping from
 * @param {Function} keydownFn a function to call when a key is pressed
 * @param {Function} keyupFn a function to call when a key is released
 * @return {Object} mapping querty keys to keyboard keys
 */
export default function(keys, startKey, keydownFn, keyupFn) {
  startKey = startKey || 'C4'
  if(!keys.includes(startKey)) startKey = keys[0]
  
  const mappedKeys = ['A', 'W', 'S', 'E', 'D', 'F', 'T', 'G', 'Y', 'H', 'U', 'J', 'K', 'O', 'L', 'P', ';', '\'']
  
  const startKeyIdx = keys.findIndex((k) => k === startKey) || 0
  const keysToMap = keys.slice(startKeyIdx, mappedKeys.length + startKeyIdx)

  const keyMap = {}
  keysToMap.forEach((k, i) => keyMap[mappedKeys[i]] = k)

  document.addEventListener('keydown', (event) => {
    const key = keyMap[event.key.toUpperCase()]
    if(!key) return
    keydownFn({name: key, frequency: Ft.toHz(key)})
  }, false)

  document.addEventListener('keyup', (event) => {
    const key = keyMap[event.key.toUpperCase()]
    if(!key) return
    keyupFn({name: key, frequency: Ft.toHz(key)})
  }, false)

  return keyMap
}
