import { LitElement, html, css } from 'lit-element'
import rough from 'roughjs'

export default customElements.define('big-clock', class BigClock extends LitElement {
  static get properties() {
    return {
      time: { type: Number },
      height: { type: Number },
    }
  }
  constructor() {
    super()
    this.time = 30
    this.height = 100
  }

  firstUpdated() {
    this.canvas = this.shadowRoot.querySelector('#clock-canvas')
    this.ctx = this.canvas.getContext('2d')
    this.rc = rough.canvas(this.canvas)
  }

  updated() {
    this.clockHeight = this.height*.9
    this.clockWidth = this.clockHeight
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    if (this.time > 0)
      this.rc.arc(this.height/2, this.height/2, this.clockWidth, this.clockHeight, (3/2)*Math.PI + (2*Math.PI/30)*(30-this.time), 2*Math.PI+(3/2)*Math.PI, true, {
        stroke: 'black', strokeWidth: 9,
        fill: '#ee855e',
        fillStyle: 'dashed',
        dashOffset: 30,
        dashGap: 25,
        roughness: 2
      })
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      
      #clock-canvas {
        display: block;
      }
    `
  }

  render() {
    return html`<canvas id='clock-canvas' width=${this.height} height=${this.height}></canvas>`
  }
})