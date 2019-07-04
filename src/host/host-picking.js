import { LitElement, html, css } from 'lit-element'
import { WiredCard } from 'wired-elements'
import BigBlock from './big-clock'

export default customElements.define('host-picking', class HostPicking extends LitElement {
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
        font-size: 1.5rem;
      }
      :host > div {
        flex-grow: 1;
      }

      wired-card {
        text-align: center;
        text-baseline: middle;
        padding: 20px;
        margin-bottom: 5px;
        font-size: 2rem;
      }

      #titles {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    `
  }
  render() {
    return html`
      <div id='titles'>
        ${this.state.titles.map(t => html`<wired-card>${t.text}</wired-card>`)}
      </div>
      <big-clock time=${this.state.countdown} height=${this.state.screenWidth*.4}></big-clock>`
  }
})