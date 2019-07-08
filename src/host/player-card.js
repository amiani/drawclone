import { LitElement, html, css, unsafeCSS } from 'lit-element'
import { WiredCard } from 'wired-elements'
import rough from 'roughjs'

export default customElements.define('player-card', class PlayerCard extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      score: { type: Number },
      elevation: { type: Number },
      color: { type: String },
    }
  }
  constructor() {
    super()
    this.name = ''
    this.score = -100
    this.elevation = 2
    this.color = '#ffc857'
  }

  firstUpdated() {
    this.svg = this.shadowRoot.querySelector('svg')
    this.rs = rough.svg(this.svg)
    const width = this.svg.parentNode.width
    const height = this.svg.parentNode.height
    this.svg.appendChild(this.rs.rectangle(0, 0, 313, 52, {
      fill: 'black',
      fillWeight: 3,
      fillStyle: 'cross-hatch',
      hachureGap: 10,
      stroke: 'transparent',
      strokeWidth: 1,
    }))
    setInterval(() => {
      this.elevation = (Math.random() * 3) + 2
    }, 333)
  }

  static get styles() {
    return css`
      #card-container {
        display: block;
      }

      #card-inner {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        line-height: 1.1;
      }

      #player-name {
        display: block;
        font-size: 3rem;
        z-index: 2;
      }

      #player-name > span {
        vertical-align: top;
      }

      #player-score {
        display: block;
        font-size: 1.4rem;
        margin-left: 50px;
        z-index: 2;
      }
      
      #player-score > span {
        vertical-align: middle;
      }
      
      svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    `
  }
  render() {
    console.log(this.color)
    return html`
      <style>
        #card-inner {
          color: ${this.color};
        }
      </style>
      <wired-card id='card-container' elevation=${this.elevation}>
        <div id='card-inner'>
          <svg viewBox='0 0 300 50' preserveAspectRatio='none'></svg>
          <div id='player-name'><span>${this.name}</span></div>
          ${this.score >= 0 ? html`<div id='player-score'><span>${this.score}</span></div>` : null}
        </div>
      </wired-card>`
  }
})