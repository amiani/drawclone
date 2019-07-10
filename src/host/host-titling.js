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
        height: 100%;
        width: 100%;
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
    const length = this.shadowRoot.host.clientWidth < this.shadowRoot.host.clientHeight ?
      this.shadowRoot.host.clientWidth :
      this.shadowRoot.host.clientHeight
    return html`
      <div id='drawing-container'>
        <wired-card id='#card' elevation=5>
          <canvas id='drawing' width=${length/drawingRatio} height=${length}></canvas>
        </wired-card>
      </div>
      <big-clock time=${this.state.countdown} height=${length}></big-clock>`
  }
})