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
        display: block;
      }

      #card-inner {
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 1.1;
      }

      #player-name {
        display: block;
        font-size: 3rem;
      }

      #player-name > span {
        vertical-align: top;
      }

      #player-score {
        display: block;
        font-size: 1.4rem;
        margin-left: 50px;
      }
      
      #player-score > span {
        vertical-align: middle;
      }
    `
  }
  render() {
    return html`
      <wired-card id='card-container' elevation=${this.elevation}>
        <div id='card-inner'>
          <div id='player-name'><span>${this.name}</span></div>
          ${this.score >= 0 ? html`<div id='player-score'><span>${this.score}</span></div>` : null}
        </div>
      </wired-card>`
  }
})