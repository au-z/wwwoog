/* eslint-disable no-multi-spaces */
export default (keys, ft, keydownFn, keyupFn) => {
  const keyMap = {
    'a': {name: 'C4', frequency: ft.toHz('C4')},
    'w': {name: 'Cs4', frequency: ft.toHz('Cs4')},
    's': {name: 'D4', frequency: ft.toHz('D4')},
    'e': {name: 'Ds4', frequency: ft.toHz('Ds4')},
    'd': {name: 'E4', frequency: ft.toHz('E4')},
    'f': {name: 'F4', frequency: ft.toHz('F4')},
    't': {name: 'Fs4', frequency: ft.toHz('Fs4')},
    'g': {name: 'G4', frequency: ft.toHz('G4')},
    'y': {name: 'Gs4', frequency: ft.toHz('Gs4')},
    'h': {name: 'A4', frequency: ft.toHz('A4')},
    'u': {name: 'As4', frequency: ft.toHz('As4')},
    'j': {name: 'B4', frequency: ft.toHz('B4')},
    'k': {name: 'C5', frequency: ft.toHz('C5')},
    'o': {name: 'Cs5', frequency: ft.toHz('Cs5')},
    'l': {name: 'D5', frequency: ft.toHz('D5')},
    'p': {name: 'Ds5', frequency: ft.toHz('Ds5')},
    ';': {name: 'E5', frequency: ft.toHz('E5')},
    '\'': {name: 'F5', frequency: ft.toHz('F5')},
  }

  document.addEventListener('keydown', (event) => {
    const key = keyMap[event.key.toLowerCase()]
    if(!key) return
    keydownFn(key)
  }, false)

  document.addEventListener('keyup', (event) => {
    const key = keyMap[event.key.toLowerCase()]
    if(!key) return
    keyupFn(key)
  }, false)

  return keyMap
}
