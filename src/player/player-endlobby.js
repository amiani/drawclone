import { LitElement, html, css } from 'lit-element'

export default customElements.define('player-endlobby', class PlayerEndLobby extends LitElement {
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
    return this.state.isLeader ?
      html`
        <button @click=${this.actions.restartGame}>New game; same players</button>
        <button @click=${this.actions.newPlayers}>New game; new players</button>` :
      html`<p>Hope you had fun :)</p>`
  }
})