import { LitElement, html, css } from 'lit-element'

export default customElements.define('host-lobby', class HostLobby extends LitElement {
  static get properties() {
    return {
      state: { type: Object },
      actions: { type: Object }
    }
  }
  constructor() {
    super()
    this.state = {}
    this.actions = {}
  }

  static get styles() {
    return css``
  }
  render() {
    return html`
      <div>
        <p>Lobby</p>
        <ul>
          ${this.state.players.map(p => html`<li>${p.name}</li>`)}
        </ul>
      </div>`
  }
})