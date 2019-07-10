import { LitElement, html, css } from 'lit-element'

export default customElements.define('host-endlobby', class HostEndLobby extends LitElement {
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
    return css`
      :host {
        min-width: 25%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }
      
      :host > player-card {
        margin-bottom: 10px;
        min-width: 25%;
      }
    `
  }
  render() {
    return html`${this.state.players
      .sort((a, b) => b.score - a.score)
      .map(p => html`<player-card name=${p.name} score=${p.score} color=${p.color}></player-card>`)}`
  }
})