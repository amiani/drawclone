import { LitElement, html, css } from 'lit-element'
import { WiredButton } from 'wired-elements'

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
        align-items: center;
      }

      p {
        text-align: center;
      }
    `
  }
  render() {
    return this.state.isDrawingSubmitted ?
      html`<p>Wait everyone else to finish</p>`:
      html`<div id='draw-container'>
        <p>${this.state.prompt}</p>
        <wired-card elevation=2>
          <draw-canvas
            .state=${this.state}
            .actions=${this.actions}
            width=${window.innerWidth*.8}
            height=${window.innerHeight*.75}></draw-canvas>
        </wired-card>
        <wired-button @click=${e=>this.actions.submitDrawing(this.state.drawing)}>Submit</wired-button>
      </div>`
  }
})