import { LitElement, html, css } from 'lit-element'
import { WiredCard } from 'wired-elements'
import draw from '../draw'
import BigClock from './big-clock'
import { drawingRatio } from '../constants'

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
    draw(this.ctx, this.state.players[this.state.currPlayerIndex].drawing)
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        justify-content: center;
      }

      #drawing-container {
        padding: 60px;
        background-color: white;
        -webkit-box-shadow: inset 0px 0px 22px 27px rgba(67,111,198,1);
        -moz-box-shadow: inset 0px 0px 22px 27px rgba(67,111,198,1);
        box-shadow: inset 0px 0px 22px 27px rgba(67,111,198,1);
      }

      #card {
        border: solid black 2px;
      }
    `
  }
  render() {
    return html`
      <div id='drawing-container'>
        <wired-card id='#card' elevation=5>
          <canvas id='drawing' width=${this.state.screenHeight*.8/drawingRatio} height=${this.state.screenHeight*.8}></canvas>
        </wired-card>
      </div>
      <big-clock time=${this.state.countdown} height=${this.state.screenWidth*.4}></big-clock>`
  }
})