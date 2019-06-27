import { LitElement, html, css } from 'lit-element'
import draw from '../draw'

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
  }

  firstUpdated() {
    this.canvas = this.shadowRoot.getElementById('drawing')
    this.ctx = this.canvas.getContext('2d')
  }

  updated() {
    draw(this.ctx, this.state.players[this.state.currPlayer].drawing)
  }

  static get styles() {
    return css`
      #drawing {
        border: solid black 2px;
      }
    `
  }
  render() {
    return html`
      <canvas id='drawing' width=${window.innerWidth*.8} height=${window.innerHeight*.8}></canvas>
      <p>${this.state.countdown}</p>`
  }
})