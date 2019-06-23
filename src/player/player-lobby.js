import { LitElement, html } from 'lit-element'

export default customElements.define('player-lobby', class PlayerLobby extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      state: { type: Object },
      actions: { type: Object }
    }
  }

  constructor() {
    super()
    this.name = ''
    this.state = {}
    this.actions = {}
  }

  submit() {
    this.actions.submitName(this.name)
  }

  render() {
    return this.state.name === '' ?
      html`
        <input
          type='text'
          placeholder="Enter name..."
          value=${this.name}
          @change=${e => this.name = e.target.value}
        />
        <button @click=${this.submit}>Submit</button>`:
      html`
        <p>${this.state.name}</p>
        ${this.state.isLeader && html`
          <button @click=${this.actions.startGame}>Everybody's In!</button>`}`
  }
})