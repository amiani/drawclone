import { LitElement, html, css } from 'lit-element'

export default customElements.define('host-guessing', class HostGuessing extends LitElement {
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
  }
})