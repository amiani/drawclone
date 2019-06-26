import { LitElement, html, css } from 'lit-element'
import { WiredButton } from 'wired-elements'

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
    return css`
      #button-container {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
      }
    `
  }
  render() {
    return this.state.isLeader ?
      html`
        <div id='button-container'>
          <wired-button @click=${this.actions.restartGame}>New game; same players</wired-button>
          <wired-button @click=${this.actions.newPlayers}>New game; new players</wired-button>
        </div>` :
      html`<p>Hope you had fun :)</p>`
  }
})