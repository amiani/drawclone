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
        display: block;
      }`
  }
  render() {
    const length = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth
    return html`<big-clock .state=${this.state} .actions=${this.actions} width=${length} height=${length}></big-clock>`
  }
})