import { LitElement, html, css } from 'lit-element'

export default customElements.define('player-picking', class PlayerPicking extends LitElement {
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
  }

  static get styles() {
  }
  render() {
    if (this.state.isCurrPlayer)
      return html`<p>It's your drawing!</p>`

    return this.state.isPickSubmitted ?
      html`<p>Wait for everyone else</p>` :
      html`<ul id='pick-container'>
        ${this.state.guesses.map(g => g.name === this.state.name ? 
          null :
          html`<li @click=${e=>this.actions.submitPick(g.name)}>${g.text}</li>`
        )}
      </ul>`
  }
})