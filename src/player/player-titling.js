import { LitElement, html, css } from 'lit-element'
import { WiredButton, WiredInput } from 'wired-elements'

export default customElements.define('player-titling', class PlayerTitling extends LitElement {
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
    this.title = ''
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
    if (e.key === 'Enter')
      this.actions.submitTitle(this.title)
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        justify-content: center;
        min-width: 50%;
      }

      wired-input {
        flex-grow: 1;
      }

      p {
        text-align: center;
      }
    `
  }
  render() {
    if (this.state.isCurrPlayer)
      return html`<p>It's your drawing!</p>`

    return this.state.isTitleSubmitted ?
      html`<p>Wait for everyone else</p>` :
      html`
        <wired-input
          type='text'
          placeholder='What is that...?'
          .value=${this.title}
          @keydown=${this.handleKeyDown}
          @change=${e => this.title = e.target.value}></wired-input>
        <wired-button @click=${e=>this.actions.submitTitle(this.title)}>Submit</wired-button>`
  }
})