import { LitElement, html, css } from 'lit-element'

export default customElements.define('host-guessing', class HostGuessing extends LitElement {
  static get properties() {
    return {
      state: { type: Object },
      actions: { type: Object }
    }
  }
  constructor() {
    super()
    this.state = {}
    this.actions = {}
    this.width = 200
    this.height = 400
  }

  firstUpdated() {
    this.canvas = this.shadowRoot.getElementById('drawing')
    this.ctx = this.canvas.getContext('2d')
  }

  draw() {
    console.log(this.ctx)
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    this.ctx.strokeStyle = '#ee855e'
    this.ctx.lineJoin = 'round'
    this.ctx.lineWidth = 5
    console.log(this.state.players[0].drawing)
    this.state.players[0].drawing.forEach(vertex => {
      if (vertex.isEnd) {
        this.ctx.lineTo(vertex.x, vertex.y)
      } else {
        this.ctx.stroke()
        this.ctx.beginPath()
        this.ctx.moveTo(vertex.x, vertex.y) //is this necessary?
      }
    })
  }

  updated() {
    this.ctx = this.shadowRoot.getElementById('drawing').getContext('2d')
    this.draw()
  }

  static get styles() {
    return css`
      #drawing {
        border: solid black 2px;
      }
    `
  }
  render() {
    console.log('render')
    return html`<canvas id='drawing' width=${this.width} height=${this.height}></canvas>`
  }
})