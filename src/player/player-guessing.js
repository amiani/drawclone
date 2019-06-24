import { LitElement, html } from 'lit-element'

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

  render() {
    return this.state.isGuessSubmitted ?
      html`<p>Wait for everyone else</p>` :
      html`<div>
        <input
          type='text'
          placeholder='What is that...?'
          .value=${this.guess}
          @change=${e => this.guess = e.target.value}/>
        <button @click=${e=>this.actions.submitGuess(this.guess)}>Submit Guess</button>
      </div>`
  }
})