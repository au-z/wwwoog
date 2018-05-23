/* eslint-disable require-jsdoc */
import DetectClick from './DetectClick'

/**
 * 
 * @param {HTMLElement} el a namespace element (default document)
 * @param {String} id an id selector string
 * @param {Object} options
 */
function Envelope(el, id, options) {
  const container = el.querySelector(`#${id}`)

  if(!id) throw new Error(`Must provide an id!`)
  if(!options.params) throw new Error(`No evelope parameters defined`)
  if(!container) throw new Error(`No container found with id ${id}.`)

  const canvas = createAndSizeCanvas(container)
  const ctx = canvas.getContext('2d')

  const PADDING = 8
  const dims = {W: container.clientWidth, H: container.clientHeight}
  const bounds = {t: PADDING, r: dims.W - PADDING, b: dims.H - PADDING, l: PADDING}

  const nodes = {
    a: {
      name: 'a', axes: ['x'], selected: false,
      pos: {x: bounds.l, y: bounds.t},
      boundingBox: {x: 0, y: 0, w: 0, h: 0},
      rangeBox: {x: bounds.l, y: bounds.t, w: (bounds.r - bounds.l) / 3, h: 0},
    },
    d: {
      name: 'd', axes: ['x'], selected: false,
      pos: {x: (bounds.r - bounds.l) / 3 + bounds.l, y: bounds.t},
      boundingBox: {x: 0, y: 0, w: 0, h: 0},
      // eslint-disable-next-line
      rangeBox: {x: (bounds.r - bounds.l) / 3 + bounds.l, y: bounds.t, w: (bounds.r - bounds.l) / 3, h: bounds.b - bounds.t},
    },
    s: {
      name: 's', axes: ['x', 'y'], selected: false,
      pos: {x: 0, y: 0},
      boundingBox: {x: 0, y: 0, w: 0, h: 0},
      // eslint-disable-next-line
      rangeBox: {x: 2 * ((bounds.r - bounds.l) / 3) + bounds.l, y: bounds.t, w: (bounds.r - bounds.l) / 3, h: bounds.b - bounds.t},
    },
    r: {
      name: 'r', axes: ['x'], selected: false,
      pos: {x: 0, y: 0},
      boundingBox: {x: 0, y: 0, w: 0, h: 0},
      // eslint-disable-next-line
      rangeBox: {x: 2 * ((bounds.r - bounds.l) / 3) + bounds.l, y: bounds.t, w: (bounds.r - bounds.l) / 3, h: bounds.b - bounds.t},
    },
  }
  nodes.a.pos.x = options.params.a * (nodes.a.rangeBox.w) + nodes.a.rangeBox.x
  nodes.d.pos.x = (options.params.d * nodes.d.rangeBox.w) + nodes.d.rangeBox.x
  nodes.r.pos.x = (options.params.d * nodes.r.rangeBox.w) + nodes.r.rangeBox.x
  nodes.s.pos.x = nodes.r.pos.x
  nodes.s.pos.y = (options.params.s * nodes.s.rangeBox.h) + nodes.s.rangeBox.y
  nodes.d.pos.y = nodes.s.pos.y

  const draw = () => {
    ctx.moveTo(bounds.l, bounds.b)
    ctx.strokeStyle = '#f44'
    line(nodes.a.pos)
    nodes.a.boundingBox = circle(nodes.a.pos)
    line(nodes.d.pos)
    nodes.d.boundingBox = circle(nodes.d.pos)
    line(nodes.s.pos)
    nodes.s.boundingBox = circle(nodes.s.pos)
    line({x: bounds.r, y: bounds.b})
  }

  function box(boundingBox) {
    const b = boundingBox
    ctx.moveTo(b.x, b.y)
    ctx.lineTo(b.x, b.y + b.h)
    ctx.lineTo(b.x + b.w, b.y + b.h)
    ctx.lineTo(b.x + b.w, b.y)
    ctx.lineTo(b.x, b.y)
    ctx.stroke()
  }

  function line(a) {
    ctx.lineTo(a.x, a.y)
    ctx.stroke()
  }

  function circle(a) {
    ctx.beginPath()
    ctx.arc(a.x, a.y, 4, 0, 2 * Math.PI, true)
    ctx.closePath()
    ctx.stroke()
    ctx.moveTo(a.x, a.y)
    return [a.x - 4, a.y - 4, a.x + 4, a.y + 4]
  }

  const detectHit = (click, boundingBox) =>
    // check a is within X bounds inclusive
    click.x >= boundingBox[0] && click.x <= boundingBox[2] &&
    // check a is within Y bounds inclusive
    click.y >= boundingBox[1] && click.y <= boundingBox[3];

  (function bindMouseInteraction(canvas) {
    let pos = {}
    let curr = null
    container.addEventListener('mousedown', mousedown)

    function mousedown(e) {
      pos = DetectClick.getRelativeCoordinates(e, container)
      window.addEventListener('mouseup', mouseup)
      Object.keys(nodes).forEach((p) => {
        if(detectHit(pos, nodes[p].boundingBox)) {
          curr = p
          nodes[curr].selected = true
          window.addEventListener('mousemove', mousemove)
        } else {
          nodes[p].selected = false
        }
      })
      container.removeEventListener('mousedown', mousedown)
    }

    function mousemove(e) {
      const newPos = DetectClick.getRelativeCoordinates(e, container)

      // eslint-disable-next-line
      if(nodes[curr].axes.includes('x') && nodes[curr].rangeBox.x <= newPos.x && newPos.x <= nodes[curr].rangeBox.x + nodes[curr].rangeBox.w) {
        nodes[curr].pos.x = newPos.x
        options.params[curr] = normalize(nodes[curr].pos, nodes[curr].rangeBox, 'x')
      }
      // eslint-disable-next-line
      if(nodes[curr].axes.includes('y') && nodes[curr].rangeBox.y <= newPos.y && newPos.y <= nodes[curr].rangeBox.y + nodes[curr].rangeBox.h) {
        nodes[curr].pos.y = newPos.y
        options.params[curr] = 1 - normalize(nodes[curr].pos, nodes[curr].rangeBox, 'y')
        if(curr === 's') {
          nodes.d.pos.y = nodes[curr].pos.y
          nodes.r.pos.x = newPos.x
          options.params.r = 1 - normalize(nodes.r.pos, nodes.r.rangeBox, 'x')
        }
      }
    }

    function mouseup(e){
      Object.keys(nodes).forEach((p) => nodes[p].selected = false)
      window.removeEventListener('mouseup', mouseup)
      window.removeEventListener('mousemove', mousemove)
      container.addEventListener('mousedown', mousedown)
    }
  })(canvas)

  function normalize(pos, rangeBox, axis) {
    if(axis === 'x') {
      return (pos.x - rangeBox.x) / rangeBox.w
    } else {
      return (pos.y - rangeBox.y) / rangeBox.h
    }
  }

  const renderFrame = (ms) => {
    requestAnimationFrame(renderFrame)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    draw()
  }
  renderFrame(0)

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
