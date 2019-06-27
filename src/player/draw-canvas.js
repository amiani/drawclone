import { LitElement, html, css } from 'lit-element'
import { WiredCard } from 'wired-elements'
import draw from '../draw'

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
  }

  firstUpdated() {
    this.canvas = this.shadowRoot.getElementById('touchme')
    this.canvasOffset = this.canvas.getBoundingClientRect()
    this.ctx = this.canvas.getContext('2d')
  }

  addVertex(x, y, isEnd) {
    this.actions.addVertex((x - this.canvasOffset.left) / this.width, (y - this.canvasOffset.top) / this.height, isEnd)
  }
  drawstart(e) {
    this.isDrawing = true
    this.addVertex(e.clientX, e.clientY, false)
  }

  drawmove(e) {
    if (this.isDrawing) {
      this.addVertex(e.clientX, e.clientY, true)
      draw(this.ctx, this.state.drawing)
    }
  }

  drawend(e) {
    this.isDrawing = false
  }

  render() {
    return html`
      <canvas
        id='touchme'
        width=${this.width}
        height=${this.height}
        @mousedown=${this.drawstart}
        @touchstart=${this.drawstart}
        @mousemove=${this.drawmove}
        @touchmove=${this.drawmove}
        @mouseup=${this.drawend}
        @mouseleave=${this.drawend}
        @touchend=${this.drawend}></canvas>`
  }
})