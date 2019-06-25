export default (ctx, drawing) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.strokeStyle = '#ee855e'
  ctx.lineJoin = 'round'
  ctx.lineWidth = 5
  drawing.forEach(vertex => {
    if (vertex.isEnd) {
      ctx.lineTo(vertex.x, vertex.y)
      ctx.stroke()
    } else {
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(vertex.x, vertex.y)
    }
  })
}