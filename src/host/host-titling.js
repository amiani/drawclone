import { LitElement, html, css } from 'lit-element'
import { WiredCard } from 'wired-elements'
import draw from '../draw'

export default customElements.define('host-titling', class HostTitling extends LitElement {
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
      #card {
        border: solid black 2px;
      }
    `
  }
  render() {
    return html`
      <wired-card id='#card' elevation=5>
        <canvas id='drawing' width=${this.state.screenWidth*.8} height=${this.state.screenHeight*.8}></canvas>
      </wired-card>
      <p>${this.state.countdown}</p>`
  }
})