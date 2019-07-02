import { LitElement, html, css } from 'lit-element'
import BigClock from './big-clock'

export default customElements.define('host-drawing', class HostDrawing extends LitElement {
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
      :host {
        display: block;
      }`
  }
  render() {
    const length = this.state.screenWidth < this.state.screenHeight ?
      this.state.screenWidth :
      this.state.screenHeight
    return html`<big-clock time=${this.state.countdown} height=${length}></big-clock>`
  }
})