import './style.css'

const canvasLower = document.getElementById('layer1')
const ctxLower = canvasLower.getContext('2d')
const canvasUpper = document.getElementById('layer2')
const ctxUpper = canvasUpper.getContext('2d')
const angles = [0.314159, 0.628318, 0.942477, 1.256636, 1.570795, 1.884954, 2.199113, 2.513272, 2.827431, 3.14159, 3.455749, 3.769908, 4.084067, 4.398226, 4.712385, 5.026544, 5.340703, 5.654862, 5.969021, 6.283180]
const rect = canvasLower.getBoundingClientRect()
const middle = {x: rect.width/2, y: rect.height/2}
let time = 0
const blocksX = [200, 600]
const blocksY = [100, 150, 400, 550]

ctxLower.lineWidth = 8
ctxLower.beginPath()
ctxLower.moveTo(200, 100)
ctxLower.lineTo(200, 400)
ctxLower.closePath()
ctxLower.stroke()

ctxLower.beginPath()
ctxLower.moveTo(200, 150)
ctxLower.lineTo(600, 150)
ctxLower.closePath()
ctxLower.stroke()

ctxLower.beginPath()
ctxLower.moveTo(600, 150)
ctxLower.lineTo(600, 550)
ctxLower.closePath()
ctxLower.stroke()

canvasUpper.addEventListener('pointermove', function (e) {
  if(e.timeStamp > time + 20) {
    clear()
    renderRays(e)
  }
});

function clear() {
  ctxUpper.clearRect(0, 0, canvasUpper.width, canvasUpper.height)
}

function renderRays(e) {
  ctxUpper.lineWidth = 1
  for (let i of angles) {
    let previousPoint = {x: e.clientX - rect.x, y: e.clientY - rect.y}
    for (let j = 1; j < 200; j++) {
      let x1 = previousPoint.x + (Math.sin(i) * 0.1 * j)
      let y1 = previousPoint.y + (Math.cos(i) * 0.1 * j)
      if(previousPoint.x > rect.width || previousPoint.x < 0 || previousPoint.y > rect.height || previousPoint.y < 0) {
        // console.log("Hit the edge at", previousPoint, rect.width, rect.height)
        break
      } else if (x1 > 196 && x1 < 204 && y1 > 96 && y1 < 404) {
        break
      } else if (x1 > 196 && x1 < 604 && y1 > 146 && y1 < 154) {
        break
      } else if (x1 > 596 && x1 < 604 && y1 > 146 && y1 < 554) {
        break
      } else {
        previousPoint.x = x1
        previousPoint.y = y1
      }
    }
    ctxUpper.beginPath()
    ctxUpper.moveTo(e.clientX - rect.x, e.clientY - rect.y)
    ctxUpper.lineTo(previousPoint.x, previousPoint.y)
    ctxUpper.closePath()
    ctxUpper.stroke()
  }
  time = e.timeStamp
}