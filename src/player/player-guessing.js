import { LitElement, html } from 'lit-element'

export default customElements.define('player-guessing', class PlayerGuessing extends LitElement {
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
    return html`<p>player guessing</p>`
  }
})