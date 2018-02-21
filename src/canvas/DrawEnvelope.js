/* eslint-disable require-jsdoc */

/**
 * 
 * @param {HTMLElement} el a namespace element (default document)
 * @param {String} id an id selector string
 * @param {Object} options
 */
function Envelope(el, id, options) {
  el = el || document
  const container = el.querySelector(`#${id}`)

  if(!id) throw new Error(`Must provide an id!`)
  if(!options.params) throw new Error(`No evelope parameters defined`)
  if(!container) throw new Error(`No container found with id ${id}.`)

  const canvas = createAndSizeCanvas(container)
  const ctx = canvas.getContext('2d')

  const dims = {W: container.clientWidth, H: container.clientHeight}
  const PADDING = 8
  const padding = {t: PADDING, r: PADDING, b: PADDING, l: PADDING}
  const limit = {a: dims.W / 3, d: dims.W / 3, s: dims.H, r: dims.W / 3}
  ctx.strokeStyle = '#f44'

  const drawEnv = (W, H, a, d, s, r) => {
    ctx.beginPath()
    ctx.moveTo(padding.l, H - padding.b)
    const A = {x: (a * limit.a) + padding.l, y: padding.t}
    const D = {x: A.x + (d * limit.d) + padding.l, y: (H - s * H) + padding.t}
    const S = {x: W - (r * limit.r) - padding.r, y: (H - s * H) + padding.t}
    const R = {x: W - padding.r, y: H - padding.b}
    ctx.lineTo(A.x, A.y)
    ctx.stroke()
    strokeCircle(A, '#f44')
    ctx.lineTo(D.x, D.y)
    ctx.stroke()
    strokeCircle(D, '#f44')
    ctx.lineTo(S.x, S.y)
    ctx.stroke()
    strokeCircle(S, '#f44')
    ctx.lineTo(R.x, R.y)
    ctx.stroke()
  }
  drawEnv(dims.W, dims.H, options.params.a, options.params.d, options.params.s, options.params.r)

  function strokeCircle(o, color) {
    ctx.beginPath()
    ctx.arc(o.x, o.y, 4, 0, 2 * Math.PI, true)
    ctx.strokeStyle = color
    ctx.stroke()
    ctx.moveTo(o.x, o.y)
  }

  /**
   * Creates, styles, and mounts the canvas
   * @param {HTMLElement} container
   * @return {HTMLElement} canvas
   */
  function createAndSizeCanvas(container) {
    const canvas = document.createElement('canvas')
    canvas.setAttribute('class', 'canvas-envelope')
    canvas.setAttribute('width', container.clientWidth)
    canvas.setAttribute('height', container.clientHeight)
    container.appendChild(canvas)
    return canvas
  }

  return
}

export default Envelope
