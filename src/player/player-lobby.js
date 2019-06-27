import { LitElement, html, css } from 'lit-element'
import { WiredButton, WiredInput } from 'wired-elements'

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

  static get styles() {
    return css`
      .input-button-container {
        display: flex;
      }
      wired-input {
        width: 100%;
      }
      #lobby-wait-container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `
  }
  render() {
    return this.state.name === '' ?
      html`
        <div class='input-button-container'>
          <wired-input
            type='text'
            placeholder="Enter name..."
            value=${this.name}
            @change=${e => this.name = e.target.value}></wired-input>
          <wired-button @click=${this.submit}>Submit</wired-button>
        </div>` :
      html`
        <div id='lobby-wait-container'>
          <p>You are: ${this.state.name}</p>
          ${this.state.isLeader ? 
            html`<wired-button @click=${this.actions.startGame}>Everybody's In!</wired-button>` :
            html`<p>sit tight...</p>`}
        </div>`
  }
})