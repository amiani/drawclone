import { LitElement, html, css } from 'lit-element'
import { WiredButton, WiredInput } from 'wired-elements'

export default customElements.define('player-lobby', class PlayerLobby extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      wiredInputWidth: { type: Number },
      state: { type: Object },
      actions: { type: Object }
    }
  }

  constructor() {
    super()
    this.name = ''
    this.wiredInputWidth = 0
    this.state = {}
    this.actions = {}
  }

  submit() {
    this.actions.submitName(this.name)
  }

  firstUpdated() {
    this.wiredInputWidth = this.shadowRoot.querySelector('wired-input').getBoundingClientRect().width
    window.addEventListener('resize', () => {
      this.wiredInputWidth = this.shadowRoot.querySelector('wired-input').getBoundingClientRect().width
    })
  }

  static get styles() {
    return css`
      .input-button-container {
        display: flex;
        justify-content: space-around;
        margin: 5px;
      }
      wired-input {
        flex-grow: 1;
      }
      #lobby-wait-container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
    `
  }
  render() {
    return html`
      <div class='main-container'>${this.state.name === '' ?
        html`
          <div class='input-button-container'>
            <wired-input
              type='text'
              placeholder="Enter name..."
              value=${this.name}
              .size=${this.wiredInputWidth}
              @change=${e => this.name = e.target.value}></wired-input>
            <wired-button elevation=1 @click=${this.submit}>Submit</wired-button>
          </div>` :
        html`
          <div id='lobby-wait-container'>
            <p>You are: ${this.state.name}</p>
            ${this.state.isLeader ? 
              html`<wired-button elevation=1 @click=${this.actions.startGame}>Everybody's In!</wired-button>` :
              html`<p>sit tight...</p>`}
          </div>`}
      </div>`

  }
})