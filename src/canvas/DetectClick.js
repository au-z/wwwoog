/* eslint-disable require-jsdoc */

/**
 * Thanks to @unconed (Steven Wittens for this snippet)
 * Retrieve the coordinates of the given event relative to the center
 * of the widget.
 *
 * @param {Event} event A mouse-related DOM event.
 * @param {HTMLElement} reference A DOM element whose position we want to transform the mouse coordinates to.
 * @return {Object} A hash containing keys 'x' and 'y'.
 */
const getRelativeCoordinates = (event, reference) => {
  let x
  let y
  event = event || window.event
  let el = event.target || event.srcElement

  /* eslint-disable eqeqeq */
  if (!window.opera && typeof event.offsetX != 'undefined') {
    // Use offset coordinates and find common offsetParent
    let pos = {x: event.offsetX, y: event.offsetY}

    // Send the coordinates upwards through the offsetParent chain.
    let e = el
    while (e) {
      e.mouseX = pos.x
      e.mouseY = pos.y
      pos.x += e.offsetLeft
      pos.y += e.offsetTop
      e = e.offsetParent
    }

    // Look for the coordinates starting from the reference element.
    e = reference
    let offset = {x: 0, y: 0}
    while (e) {
      if (typeof e.mouseX != 'undefined') {
        x = e.mouseX - offset.x
        y = e.mouseY - offset.y
        break
      }
      offset.x += e.offsetLeft
      offset.y += e.offsetTop
      e = e.offsetParent
    }

    // Reset stored coordinates
    e = el
    while (e) {
      e.mouseX = undefined
      e.mouseY = undefined
      e = e.offsetParent
    }
  } else {
    // Use absolute coordinates
    let pos = getAbsolutePosition(reference)
    x = event.pageX - pos.x
    y = event.pageY - pos.y
  }
  return {x, y}
}

function getAbsolutePosition(element) {
  const r = {x: element.offsetLeft, y: element.offsetTop}
  if (element.offsetParent) {
    const tmp = getAbsolutePosition(element.offsetParent)
    r.x += tmp.x
    r.y += tmp.y
  }
  return r
}

export default {
  getRelativeCoordinates,
}
