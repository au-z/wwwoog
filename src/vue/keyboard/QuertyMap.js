import FREQUENCY_TABLE from '../../audio/FrequencyTable'
const FrequencyTable = FREQUENCY_TABLE.instance(440)

/* eslint-disable no-multi-spaces */
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
  
  const mappedValues = ['a', 'w', 's', 'e', 'd', 'f', 't', 'g', 'y', 'h', 'u', 'j', 'k', 'o', 'l', 'p', ';', '\'']
  
  const startKeyIdx = keys.findIndex((k) => k === startKey) || 0
  const keysToMap = keys.slice(startKeyIdx, mappedValues.length + startKeyIdx)
  const keyMap = {}
  keysToMap.forEach((k, i) => keyMap[mappedValues[i]] = k)

  document.addEventListener('keydown', (event) => {
    const key = keyMap[event.key.toLowerCase()]
    if(!key) return
    keydownFn({name: key, frequency: FrequencyTable.toHz(key)})
  }, false)

  document.addEventListener('keyup', (event) => {
    const key = keyMap[event.key.toLowerCase()]
    if(!key) return
    keyupFn({name: key, frequency: FrequencyTable.toHz(key)})
  }, false)

  return keyMap
}
