import { LitElement, html } from 'lit-element'

export default customElements.define('player-picking', class PlayerPicking extends LitElement {
  static get properties() {
    return {
      state: { type: Object },
      actions: { type: Object },
    }
  }
  constructor() {
    super()
    this.state = {}
    this.actions = {}
  }

  render() {
    return html`<p>player picking</p>`
  }
})