/* eslint-disable no-console */
/* eslint-disable require-jsdoc */

let FrequencyTable = (function() {
  let instance
  const toneCount = 12
  const scalar = 1.059463094359
  const noteMap = {
    A: 0, As: 1, Bf: 1, B: 2, Cf: 2, Bs: 3, C: 3, Cs: 4, Df: 4, D: 5, Ds: 6,
    Ef: 6, E: 7, Ff: 7, Es: 8, F: 8, Fs: 9, Gf: 9, G: 10, Gs: 11, Af: 11,
  }

  function init(tuning) {
    instance = {tuning, toHz}
    return instance
  }

  function toHz(name) {
    let displacement = placeNote(name)
    let hz = instance.tuning * Math.pow(scalar, displacement)
    return hz
  }

  function placeNote(name) {
    const match = /^([a-gA-G]{1}[fs]{0,1})([0-9]){1}$/i.exec(name)
    const note = match[1]
    let oct = match[2]
    const map = noteMap[note]
    let leftOfC = map < 3
    if(leftOfC) {
      return map + (toneCount * (oct - 4))
    } else {
      return (map - toneCount) - (toneCount * (4 - oct))
    }
  }

  return {
    instance: (tuning = 440) => (!instance) ? init(tuning) : instance,
  }
})()

export default FrequencyTable
