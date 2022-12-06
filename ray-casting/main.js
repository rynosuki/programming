import './style.css'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
let painting = false
let savedPoint = undefined

canvas.addEventListener('click', e => {
  const rect = canvas.getBoundingClientRect()
  
  if(!painting) {
    savedPoint = {
      x: e.clientX - rect.x,
      y: e.clientY - rect.y
    }   
  } else {
    console.log(savedPoint)
    ctx.beginPath()
    ctx.moveTo(savedPoint.x, savedPoint.y)
    ctx.lineTo(e.clientX - rect.x, e.clientY - rect.y)
    ctx.stroke()
    savedPoint = undefined
  }
  painting = !painting
})
