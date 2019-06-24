import { LitElement, html, css } from 'lit-element'

import DrawCanvas from './draw-canvas'

export default customElements.define('player-drawing', class PlayerDrawing extends LitElement {
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

  static get styles() {
    return css`
      #draw-container {
        display: flex;
        flex-direction: column;
      }
    `
  }
  render() {
    return html`
      <div id='draw-container'>
        <draw-canvas .state=${this.state} .actions=${this.actions}></draw-canvas>
        <button @click=${this.actions.submitDrawing}>Submit</button>
      </div>
      `
  }
})