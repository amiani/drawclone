import { LitElement, html, css } from 'lit-element'
import BigClock from './big-clock'

export default customElements.define('host-drawing', class HostDrawing extends LitElement {
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
        justify-content: center;
        width: 100%;
        height: 100%;
      }`
  }
  render() {
    const length = this.shadowRoot.host.clientWidth < this.shadowRoot.host.clientHeight ?
      this.shadowRoot.host.clientWidth :
      this.shadowRoot.host.clientHeight
    return html`<big-clock time=${this.state.countdown} height=${length}></big-clock>`
  }
})