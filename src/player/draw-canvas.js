import { LitElement, html, css } from 'lit-element'
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

  mousedown(e) {
    this.isDrawing = true
    this.actions.addVertex(e.clientX - this.canvasOffset.left, e.clientY - this.canvasOffset.top, false)
  }

  mousemove(e) {
    if (this.isDrawing) {
      this.actions.addVertex(e.clientX - this.canvasOffset.left, e.clientY - this.canvasOffset.top, true)
      draw(this.ctx, this.state.drawing)
    }
  }

  mouseup(e) {
    this.isDrawing = false
  }
  mouseleave(e) {
    this.isDrawing = false
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