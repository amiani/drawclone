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
    this.room = ''
    this.wiredInputWidth = 0
    this.state = {}
    this.actions = {}
  }

  submit() {
    this.actions.join(this.name, this.room)
  }

  firstUpdated() {
    this.wiredInputWidth = this.shadowRoot.querySelector('wired-input').getBoundingClientRect().width
    window.addEventListener('resize', this.resetInputWidth)
  }

  disconnectedCallback() {
    window.removeEventListener('resize', this.resetInputWidth)
  }

  resetInputWidth(e) {
    this.wiredInputWidth = this.shadowRoot.querySelector('wired-input').getBoundingClientRect().width
  }

  handleKeydown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.submit()
    }
  }

  static get styles() {
    return css`
      :host {
        min-width: 33%
      }
      .input-button-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 5px;
      }
      wired-input {
        flex-grow: 1;
        margin-bottom: 2px;
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
      ${this.state.name === '' ?
        html`
          <div class='input-button-container'>
            <wired-input
              type='text'
              placeholder="Enter name..."
              value=${this.name}
              .size=${this.wiredInputWidth}
              @change=${e => this.name = e.target.value}
              @keydown=${this.handleKeydown}></wired-input>
            <wired-input
              type='text'
              placeholder='Enter room code...'
              value=${this.room}
              .size=${this.wiredInputWidth}
              @change=${e => this.room = e.target.value}></wired-input>
            <wired-button elevation=2 @click=${this.submit}>Submit</wired-button>
          </div>` :
        html`
          <div id='lobby-wait-container'>
            <p>You are: ${this.state.name}</p>
            ${this.state.isLeader ? 
              html`<wired-button elevation=2 @click=${this.actions.startGame}>Everybody's In!</wired-button>` :
              html`<p>sit tight...</p>`}
          </div>`}`
  }
})