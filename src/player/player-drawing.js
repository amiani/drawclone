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
    return this.state.isDrawingSubmitted ?
      html`<p>Wait everyone else to finish</p>`:
      html`<div id='draw-container'>
        <p>${this.state.prompt}</p>
        <draw-canvas
          .state=${this.state}
          .actions=${this.actions}
          width=200
          height=400></draw-canvas>
        <button @click=${this.actions.submitDrawing}>Submit</button>
      </div>`
  }
})