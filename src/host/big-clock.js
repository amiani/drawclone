import { LitElement, html, css } from 'lit-element'

export default customElements.define('big-clock', class BigClock extends LitElement {
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
      #clock-container {

      }
    `
  }

  render() {
    return html`
      <div id='clock-container'>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200' width='100%' height='100%'>
          <circle cx='100' cy='100' r='100' fill='#ee855e'/>
        </svg>
      </div>`
  }
})