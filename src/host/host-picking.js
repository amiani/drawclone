import { LitElement, html, css } from 'lit-element'

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
    return css``
  }
  render() {
    return html`<p>Picking Phase</p>`
  }
})