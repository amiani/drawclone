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
    return css`
      ul {
        list-style: none;
      }
    `
  }
  render() {
    return html`
      <ul>
        ${this.state.titles.map(g => html`<li>${g}</li>`)}
      </ul>
      <p>${this.state.countdown}</p>`
  }
})