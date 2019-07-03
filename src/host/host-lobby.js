import { LitElement, html, css } from 'lit-element'
import PlayerCard from './player-card'

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
    return css`
      :host {
        display: flex;
        flex-direction: column;
        min-width: 25%;
      }
      
      p {
        text-align: center;
        font-size: 2.3rem;
      }

      .lobby-card {
        margin-bottom: 5px;
      }
    `
  }
  render() {
    return html`
      ${this.state.players.length > 0 ?
        html`<p>Look who's here!</p>` :
        html`<p>Waiting for players...</p>`}
      ${this.state.players.map(p => html`<player-card class='lobby-card' name=${p.name}></player-card>`)}`
  }
})