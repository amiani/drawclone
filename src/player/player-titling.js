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

    return this.state.isTitleSubmitted ?
      html`<p>Wait for everyone else</p>` :
      html`<div>
        <wired-input
          type='text'
          placeholder='What is that...?'
          .value=${this.title}
          @change=${e => this.title = e.target.value}></wired-input>
        <wired-button @click=${e=>this.actions.submitTitle(this.title)}>Submit</wired-button>
      </div>`
  }
})