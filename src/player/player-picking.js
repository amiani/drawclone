import { LitElement, html, css } from 'lit-element'
import { WiredButton } from 'wired-elements'

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

  static get styles() {
    return css`
      #pick-container {
        list-style: none;
      }
      
      p {
        text-align: center;
      }
    `
  }
  render() {
    if (this.state.isCurrPlayer)
      return html`<p>It's your drawing!</p>`

    console.log(this.state.isPickSubmitted)
    return this.state.isPickSubmitted ?
      html`<p>Wait for everyone else</p>` :
      html`
        <ul id='pick-container'>
          ${this.state.titles.map(g => g.name === this.state.name ? 
            null :
            html`<li><wired-button @click=${e=>this.actions.submitPick(g.name)}>${g.text}</wired-button></li>`
          )}
        </ul>`
  }
})