import { LitElement, html, css } from 'lit-element'

export default customElements.define('draw-canvas', class DrawCanvas extends LitElement {
  static get properties() {
    return {
      state: { type: Object },
      actions: { type: Object },
      width: { type: Number },
      height: { type: Number },
    }
  }
  constructor() {
    super()
    this.width = 200
    this.height = 300
    this.isDrawing = false
    this.vertices = []
  }

  firstUpdated() {
    this.canvas = this.shadowRoot.getElementById('touchme')
    this.canvasOffset = this.canvas.getBoundingClientRect()
    this.ctx = this.canvas.getContext('2d')
  }

  mousedown(e) {
    this.isDrawing = true
    this.vertices.push({
      x: e.clientX - this.canvasOffset.left,
      y: e.clientY - this.canvasOffset.top,
      isEnd: false
    })
  }

  mousemove(e) {
    if (this.isDrawing) {
      this.vertices.push({
        x: e.clientX - this.canvasOffset.left,
        y: e.clientY - this.canvasOffset.top,
        isEnd: true
      })
      this.redraw()
    }
  }

  mouseup(e) {
    this.isDrawing = false
  }
  mouseleave(e) {
    this.isDrawing = false
  }

  redraw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    this.ctx.strokeStyle = '#ee855e'
    this.ctx.lineJoin = 'round'
    this.ctx.lineWidth = 5
    this.vertices.forEach(vertex => {
      if (vertex.isEnd) {
        this.ctx.lineTo(vertex.x, vertex.y)
      } else {
        this.ctx.stroke()
        this.ctx.beginPath()
      }
    })
  }

  static get styles() {
    return css`
      #touchme {
        border: solid black 2px;
      }
    `
  }
  render() {
    return html`
      <canvas
        id='touchme'
        width=${this.width}
        height=${this.height}
        @mousedown=${this.mousedown}
        @mousemove=${this.mousemove}
        @mouseup=${this.mouseup}
        @mouseleave=${this.mouseleave}></canvas>`
  }
})