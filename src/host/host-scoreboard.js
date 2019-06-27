import { LitElement, html, css } from 'lit-element'

export default customElements.define('host-scoreboard', class HostScoreboard extends LitElement {
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
      <p>Scores</p>
      <ul>
        ${this.state.players
          .sort((a, b) => b.score - a.score)
          .map(p => html`<li>${p.name}: ${p.score}</li>`)}
      </ul>
      <p>${this.state.countdown}</p>`
  }
})