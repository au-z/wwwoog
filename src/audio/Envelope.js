export default (audioContext, gainParam) => {
  let ac = audioContext
  let gain = gainParam

  const on = (a, d, s) => {
    const now = ac.currentTime
    gain.cancelScheduledValues(0)
    gain.setValueAtTime(0, now)
    gain.linearRampToValueAtTime(1, now + a) // gain to 1 over attack time
    gain.linearRampToValueAtTime(s, now + a + d) // gain to sustain after decay time
    gain.setValueAtTime(1, now)
  }

  const off = (r) => {
    const now = ac.currentTime
    gain.cancelScheduledValues(0)
    gain.setValueAtTime(gain.value, now)
    gain.linearRampToValueAtTime(0, now + r) // gain to 0 over delay time
  }

  return {
    on,
    off,
  }
}
