export default (ctx, drawing) => {
  const { width, height } = ctx.canvas
  ctx.clearRect(0, 0, width, height)
  ctx.strokeStyle = '#ee855e'
  ctx.lineJoin = 'round'
  ctx.lineWidth = 5
  drawing.forEach(vertex => {
    if (vertex.isEnd) {
      ctx.lineTo(vertex.x * width, vertex.y * height)
      ctx.stroke()
    } else {
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(vertex.x * width, vertex.y * height)
    }
  })
}