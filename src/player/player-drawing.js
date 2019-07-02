import { LitElement, html, css } from 'lit-element'
import { WiredButton, WiredCard } from 'wired-elements'
import { drawingRatio } from '../constants'
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
      
      #prompt {
        text-align: center;
        font-size: 1.5rem;
        margin-bottom: 5px;
      }

      wired-card {
        margin-bottom: 5px;
      }
    `
  }
  render() {
    return html`
      <div id='draw-container'>
        ${this.state.isDrawingSubmitted ?
          html`<p>Wait everyone else to finish</p>`:
          html`
            <div id='prompt'>${this.state.prompt}</div>
            <wired-card elevation=5>
              <draw-canvas
                .state=${this.state}
                .actions=${this.actions}
                width=${window.innerWidth*.9}
                height=${window.innerWidth*.9*drawingRatio}></draw-canvas>
            </wired-card>
            <wired-button elevation=2 @click=${e=>this.actions.submitDrawing(this.state.drawing)}>Submit</wired-button>`}
      </div>`
  }
})