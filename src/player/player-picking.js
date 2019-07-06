import { LitElement, html, css } from 'lit-element'
import { WiredButton } from 'wired-elements'

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
    return css`
      :host {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
      }

      wired-button {
        display: block;
        max-width: 200px;
      }

      p {
        text-align: center;
      }
    `
  }
  render() {
    if (this.state.isCurrPlayer)
      return html`<p>It's your drawing!</p>`

    return this.state.isPickSubmitted ?
      html`<p>Wait for everyone else</p>` :
      html`
        ${this.state.titles.map(g => g.name === this.state.name ? 
          null :
          html`<wired-button @click=${e=>this.actions.submitPick(g.name)}>${g.text}</wired-button>`
        )}`
  }
})