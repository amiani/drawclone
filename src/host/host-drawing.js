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
    return css``
  }
  render() {
    return html`<big-clock .state=${this.state} .actions=${this.actions} width=${window.innerHeight} height=${window.innerHeight}></big-clock>`
  }
})