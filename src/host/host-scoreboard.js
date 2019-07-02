import { LitElement, html, css } from 'lit-element'
import rough from 'roughjs'
import ScoreAnimation from './ScoreAnimation'
import testState from './testState'

export default customElements.define('host-scoreboard', class HostScoreboard extends LitElement {
  static get properties() {
    return {
      state: { type: Object },
      actions: { type: Object },
      showScoreboard: { type: Boolean }
    }
  }
  constructor() {
    super()
    this.state = {}
    this.showScoreboard = false
    this.actions = {}
    this.animIndex = 0
  }

  firstUpdated() {
    this.ctx = this.shadowRoot.querySelector('#score-canvas').getContext('2d')
    this.rc = rough.canvas(this.ctx.canvas)
    this.audio = new Audio()
    this.scoreAnimations = this.state.players
      .filter(p => (p.pickers.length > 0 && !p.isCurrPlayer))
      .map(p => new ScoreAnimation(
        p,
        this.rc.generator, 
        this.state.screenWidth, 
        this.state.screenHeight, 
        this.audio, 
        '/audio/pipe_flute_dry.wav',
        ()=>this.onAnimComplete()))
    
    const currPlayer = this.state.players.find(p => p.isCurrPlayer)
    this.scoreAnimations.push(new ScoreAnimation(
      currPlayer,
      this.rc.generator,
      this.state.screenWidth,
      this.state.screenHeight,
      this.audio,
      '/audio/pipe_flute_dry.wav',
      ()=>this.onAnimComplete()))
    this.activeAnim = this.scoreAnimations[0]
    this.activeAnim.play()
    this.draw()
  }

  onAnimComplete() {
    if (this.animIndex < this.scoreAnimations.length-1) {
      this.animIndex++
      this.activeAnim = this.scoreAnimations[this.animIndex]
      this.activeAnim.play()
    }
    else {
      console.log('last anim')
      this.showScoreboard = true
      setTimeout(this.actions.endScoreboard, 10000)
    }
  }

  draw() {
    !this.showScoreboard && window.requestAnimationFrame(()=>this.draw())
    this.ctx.clearRect(0, 0, this.state.screenWidth, this.state.screenHeight)
    this.activeAnim.draw(this.ctx, this.rc)
  }

  static get styles() {
    return css`
      .scoreboard-container {
        display: flex;
        flex-direction: column;
      }

      .score-box {

      }

      canvas {
        display: block;
      }`
  }
  render() {
    //this.state = testState
    return this.showScoreboard ?
      html`
        <div class='scoreboard-container'>
          ${this.state.players
            .sort((a, b) => b.score - a.score)
            .map(p => html`<div class='score-box'>${p.name}: ${p.score}</div>`)}
        </div>` :
      html`<canvas id='score-canvas' width=${this.state.screenWidth} height=${this.state.screenHeight}></canvas>`
  }
})