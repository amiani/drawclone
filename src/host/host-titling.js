import { LitElement, html, css } from 'lit-element'
import rough from 'roughjs'
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

    this.svg = this.shadowRoot.querySelector('svg')
    this.rs = rough.svg(this.svg)
    this.svg.appendChild(this.rs.rectangle(3, 3, this.width-6, this.height-6, {
      roughness: 2.5,
      strokeWidth: 20,
    }))
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
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      #drawing-frame {
        position: relative;
      }
      
      svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 10;
        background-color: white;
      }
    `
  }
  render() {
    this.height = this.shadowRoot.host.clientHeight*.9
    console.log(this.height)
    this.width = this.height/drawingRatio
    return html`
      <div id='drawing-container'>
        <div id='drawing-frame'>
          <svg viewBox='0 0 ${this.width} ${this.height}' preserveAspectRatio='none'></svg>
          <canvas id='drawing' width=${this.width} height=${this.height}></canvas>
        </div>
      </div>
      <big-clock time=${this.state.countdown} height=${this.height}></big-clock>`
  }
})