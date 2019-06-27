import { LitElement, html, css } from 'lit-element'
import { WiredButton, WiredInput } from 'wired-elements'

export default customElements.define('player-guessing', class PlayerGuessing extends LitElement {
  static get properties() {
    return {
      state: { type: Object },
      actions: { type: Object },
    }
  }
  constructor() {
    super()
    this.state = {}
    this.actions = {}
    this.guess = ''
  }

  static get styles() {
    return css`
      p {
        text-align: center;
      }
    `
  }
  render() {
    if (this.state.isCurrPlayer)
      return html`<p>It's your drawing!</p>`

    return this.state.isGuessSubmitted ?
      html`<p>Wait for everyone else</p>` :
      html`<div>
        <wired-input
          type='text'
          placeholder='What is that...?'
          .value=${this.guess}
          @change=${e => this.guess = e.target.value}></wired-input>
        <wired-button @click=${e=>this.actions.submitGuess(this.guess)}>Submit</wired-button>
      </div>`
  }
})