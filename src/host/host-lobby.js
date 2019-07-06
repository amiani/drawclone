import { LitElement, html, css } from 'lit-element'
import { WiredToggle } from 'wired-elements'
import PlayerCard from './player-card'

export default customElements.define('host-lobby', class HostLobby extends LitElement {
  static get properties() {
    return {
      state: { type: Object },
      actions: { type: Object },
      isFullscreen: { type: Boolean },
    }
  }
  constructor() {
    super()
    this.state = {}
    this.actions = {}
    this.isFullscreen = !!document.fullscreenElement
  }

  toggleFullscreen(e) {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen(); 
      }
    }
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: column;
        min-width: 25%;
        font-size: 2.3rem;
      }
      
      #fullscreen-container {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      wired-toggle {
        margin-left: 5px;
      }

      #room-name {
        font-size: 3rem;
      }

      p {
        text-align: center;
      }

      .lobby-card {
        margin-bottom: 5px;
      }
    `
  }
  render() {
    console.log(this.state.players)
    return html`
      <div id='fullscreen-container'>
        <div>Fullscreen</div>
        <wired-toggle
          .checked=${this.isFullscreen}
          @change=${this.toggleFullscreen}></wired-toggle>
      </div>
      <p>Enter code: <span id='room-name'>${this.state.roomName}</span></p>
      ${this.state.players.length > 0 ?
        html`<p>Look who's here!</p>` :
        html`<p>Waiting for players...</p>`}
      ${this.state.players.map(p => html`<player-card class='lobby-card' name=${p.name} color=${p.color}></player-card>`)}`
  }
})