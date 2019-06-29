import { LitElement, html, css } from 'lit-element'
import rough from 'roughjs'

export default customElements.define('big-clock', class BigClock extends LitElement {
  static get properties() {
    return {
      state: { type: Object },
      actions: { type: Object },
      width: { type: Number },
      height: { type: Number }
    }
  }
  constructor() {
    super()
    this.state = {}
    this.actions = {}
    this.width = 100
    this.height = 100
  }

  firstUpdated() {
    this.canvas = this.shadowRoot.querySelector('#clock-canvas')
    this.ctx = this.canvas.getContext('2d')
    this.roughClock = rough.canvas(this.canvas)
  }

  updated() {
    this.clockWidth = this.width*.9
    this.clockHeight = this.clockWidth
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    if (this.state.countdown > 0)
      this.roughClock.arc(this.width/2, this.height/2, this.clockWidth, this.clockHeight, (3/2)*Math.PI + (2*Math.PI/30)*(30-this.state.countdown), 2*Math.PI+(3/2)*Math.PI, true, {
        stroke: 'black', strokeWidth: 9,
        fill: '#ee855e'
      })
  }

  static get styles() {
    return css`
      #clock-container {

      }
    `
  }

  render() {
    return html`
      <div id='clock-container'>
        <canvas id='clock-canvas' width=${this.width} height=${this.height}></canvas>
      </div>`
  }
})