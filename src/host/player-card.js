import { LitElement, html, css } from 'lit-element'
import { WiredCard } from 'wired-elements'

export default customElements.define('player-card', class PlayerCard extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      score: { type: Number },
      elevation: { type: Number }
    }
  }
  constructor() {
    super()
    this.name = ''
    this.score = -100
    this.elevation = 2
  }

  firstUpdated() {
    setInterval(() => {
      this.elevation = (Math.random() * 3) + 2
    }, 333)
  }

  static get styles() {
    return css`
      #card-container {
        display: flex;
        justify-content: space-around;
        text-baseline: middle;
      }

      #player-name {
        display: inline-block;
        font-size: 1.8rem;
      }

      #player-score {
        display: inline-block;
        font-size: 1.4rem;
      }
    `
  }
  render() {
    return html`
      <wired-card id='card-container' elevation=${this.elevation}>
        <div id='player-name'>${this.name}</div>
        ${this.score >= 0 ? html`<div id='player-score'>${this.score}</div>` : null}
      </wired-card>`
  }
})