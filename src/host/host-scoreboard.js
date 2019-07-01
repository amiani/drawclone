import { LitElement, html, css } from 'lit-element'
import rough from 'roughjs'
import ScoreAnimation from './ScoreAnimation'

export default customElements.define('host-scoreboard', class HostScoreboard extends LitElement {
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
    this.animIndex = 0
  }

  firstUpdated() {
    this.state = {
      "phase": 5,
      "players": [
          {
              "name": "aaa",
              "phase": 5,
              "isLeader": true,
              "score": 0,
              "prompt": "blue shoe",
              "drawing": [
                  {
                      "x": 0.3713768115942029,
                      "y": 0.3625,
                      "isEnd": false
                  },
                  {
                      "x": 0.36533816425120774,
                      "y": 0.3611111111111111,
                      "isEnd": true
                  },
                  {
                      "x": 0.3613123993558776,
                      "y": 0.3527777777777778,
                      "isEnd": true
                  },
                  {
                      "x": 0.3552737520128824,
                      "y": 0.3416666666666667,
                      "isEnd": true
                  },
                  {
                      "x": 0.3532608695652174,
                      "y": 0.33055555555555555,
                      "isEnd": true
                  },
                  {
                      "x": 0.3693639291465378,
                      "y": 0.30833333333333335,
                      "isEnd": true
                  },
                  {
                      "x": 0.40962157809983896,
                      "y": 0.2847222222222222,
                      "isEnd": true
                  },
                  {
                      "x": 0.482085346215781,
                      "y": 0.25972222222222224,
                      "isEnd": true
                  },
                  {
                      "x": 0.6048711755233495,
                      "y": 0.24305555555555555,
                      "isEnd": true
                  },
                  {
                      "x": 0.7377214170692431,
                      "y": 0.2263888888888889,
                      "isEnd": true
                  },
                  {
                      "x": 0.8283011272141707,
                      "y": 0.22361111111111112,
                      "isEnd": true
                  },
                  {
                      "x": 0.8705716586151369,
                      "y": 0.22361111111111112,
                      "isEnd": true
                  },
                  {
                      "x": 0.8786231884057971,
                      "y": 0.2263888888888889,
                      "isEnd": true
                  },
                  {
                      "x": 0.8886876006441223,
                      "y": 0.23333333333333334,
                      "isEnd": true
                  },
                  {
                      "x": 0.8967391304347826,
                      "y": 0.24861111111111112,
                      "isEnd": true
                  },
                  {
                      "x": 0.8987520128824477,
                      "y": 0.2763888888888889,
                      "isEnd": true
                  },
                  {
                      "x": 0.8806360708534622,
                      "y": 0.3194444444444444,
                      "isEnd": true
                  },
                  {
                      "x": 0.8323268921095008,
                      "y": 0.3763888888888889,
                      "isEnd": true
                  },
                  {
                      "x": 0.7820048309178744,
                      "y": 0.4388888888888889,
                      "isEnd": true
                  },
                  {
                      "x": 0.729669887278583,
                      "y": 0.49444444444444446,
                      "isEnd": true
                  },
                  {
                      "x": 0.6491545893719807,
                      "y": 0.5597222222222222,
                      "isEnd": true
                  },
                  {
                      "x": 0.5263687600644122,
                      "y": 0.6277777777777778,
                      "isEnd": true
                  },
                  {
                      "x": 0.4076086956521739,
                      "y": 0.6888888888888889,
                      "isEnd": true
                  },
                  {
                      "x": 0.29086151368760066,
                      "y": 0.7458333333333333,
                      "isEnd": true
                  },
                  {
                      "x": 0.19223027375201288,
                      "y": 0.7902777777777777,
                      "isEnd": true
                  },
                  {
                      "x": 0.10165056360708534,
                      "y": 0.8291666666666667,
                      "isEnd": true
                  },
                  {
                      "x": 0.005032206119162641,
                      "y": 0.8638888888888889,
                      "isEnd": true
                  },
                  {
                      "x": 0.735708534621578,
                      "y": 0.7472222222222222,
                      "isEnd": false
                  },
                  {
                      "x": 0.7336956521739131,
                      "y": 0.7472222222222222,
                      "isEnd": true
                  },
                  {
                      "x": 0.729669887278583,
                      "y": 0.7513888888888889,
                      "isEnd": true
                  },
                  {
                      "x": 0.7236312399355878,
                      "y": 0.7555555555555555,
                      "isEnd": true
                  },
                  {
                      "x": 0.7115539452495974,
                      "y": 0.7652777777777777,
                      "isEnd": true
                  },
                  {
                      "x": 0.7035024154589372,
                      "y": 0.7722222222222223,
                      "isEnd": true
                  },
                  {
                      "x": 0.695450885668277,
                      "y": 0.7763888888888889,
                      "isEnd": true
                  }
              ],
              "title": "car",
              "pick": "bbb",
              "pickers": [
                  "ccc",
                  "amiani"
              ],
              "isCurrPlayer": false,
              "isDrawingSubmitted": true,
              "isTitleSubmitted": true,
              "isPickSubmitted": true
          },
          {
              "name": "bbb",
              "phase": 5,
              "isLeader": false,
              "score": 0,
              "prompt": "among the bears",
              "drawing": [
                  {
                      "x": 0.19768370607028754,
                      "y": 0.6347222222222222,
                      "isEnd": false
                  },
                  {
                      "x": 0.19568690095846644,
                      "y": 0.6347222222222222,
                      "isEnd": true
                  },
                  {
                      "x": 0.18170926517571884,
                      "y": 0.6208333333333333,
                      "isEnd": true
                  },
                  {
                      "x": 0.15175718849840256,
                      "y": 0.5819444444444445,
                      "isEnd": true
                  },
                  {
                      "x": 0.10982428115015974,
                      "y": 0.5333333333333333,
                      "isEnd": true
                  },
                  {
                      "x": 0.06589456869009584,
                      "y": 0.4652777777777778,
                      "isEnd": true
                  },
                  {
                      "x": 0.03793929712460064,
                      "y": 0.3972222222222222,
                      "isEnd": true
                  },
                  {
                      "x": 0.029952076677316294,
                      "y": 0.3541666666666667,
                      "isEnd": true
                  },
                  {
                      "x": 0.035942492012779555,
                      "y": 0.3277777777777778,
                      "isEnd": true
                  },
                  {
                      "x": 0.0579073482428115,
                      "y": 0.31527777777777777,
                      "isEnd": true
                  },
                  {
                      "x": 0.08985623003194888,
                      "y": 0.31527777777777777,
                      "isEnd": true
                  },
                  {
                      "x": 0.14376996805111822,
                      "y": 0.33611111111111114,
                      "isEnd": true
                  },
                  {
                      "x": 0.20567092651757188,
                      "y": 0.3763888888888889,
                      "isEnd": true
                  },
                  {
                      "x": 0.26357827476038337,
                      "y": 0.4166666666666667,
                      "isEnd": true
                  },
                  {
                      "x": 0.31549520766773165,
                      "y": 0.45,
                      "isEnd": true
                  },
                  {
                      "x": 0.3454472843450479,
                      "y": 0.4666666666666667,
                      "isEnd": true
                  },
                  {
                      "x": 0.35742811501597443,
                      "y": 0.46805555555555556,
                      "isEnd": true
                  },
                  {
                      "x": 0.35942492012779553,
                      "y": 0.46805555555555556,
                      "isEnd": true
                  },
                  {
                      "x": 0.35942492012779553,
                      "y": 0.46111111111111114,
                      "isEnd": true
                  },
                  {
                      "x": 0.35942492012779553,
                      "y": 0.4513888888888889,
                      "isEnd": true
                  },
                  {
                      "x": 0.36142172523961663,
                      "y": 0.44166666666666665,
                      "isEnd": true
                  },
                  {
                      "x": 0.3654153354632588,
                      "y": 0.43472222222222223,
                      "isEnd": true
                  },
                  {
                      "x": 0.371405750798722,
                      "y": 0.42777777777777776,
                      "isEnd": true
                  },
                  {
                      "x": 0.38538338658146964,
                      "y": 0.4236111111111111,
                      "isEnd": true
                  },
                  {
                      "x": 0.3993610223642172,
                      "y": 0.4125,
                      "isEnd": true
                  },
                  {
                      "x": 0.41333865814696485,
                      "y": 0.39444444444444443,
                      "isEnd": true
                  },
                  {
                      "x": 0.4333067092651757,
                      "y": 0.35555555555555557,
                      "isEnd": true
                  },
                  {
                      "x": 0.46126198083067094,
                      "y": 0.3013888888888889,
                      "isEnd": true
                  },
                  {
                      "x": 0.5011980830670927,
                      "y": 0.2361111111111111,
                      "isEnd": true
                  },
                  {
                      "x": 0.5571086261980831,
                      "y": 0.16805555555555557,
                      "isEnd": true
                  },
                  {
                      "x": 0.603035143769968,
                      "y": 0.11944444444444445,
                      "isEnd": true
                  },
                  {
                      "x": 0.6369808306709265,
                      "y": 0.09722222222222222,
                      "isEnd": true
                  },
                  {
                      "x": 0.6529552715654952,
                      "y": 0.09027777777777778,
                      "isEnd": true
                  },
                  {
                      "x": 0.6629392971246006,
                      "y": 0.09444444444444444,
                      "isEnd": true
                  },
                  {
                      "x": 0.6829073482428115,
                      "y": 0.11666666666666667,
                      "isEnd": true
                  },
                  {
                      "x": 0.7028753993610224,
                      "y": 0.15555555555555556,
                      "isEnd": true
                  },
                  {
                      "x": 0.7348242811501597,
                      "y": 0.20416666666666666,
                      "isEnd": true
                  },
                  {
                      "x": 0.764776357827476,
                      "y": 0.2569444444444444,
                      "isEnd": true
                  },
                  {
                      "x": 0.7927316293929713,
                      "y": 0.31527777777777777,
                      "isEnd": true
                  },
                  {
                      "x": 0.8146964856230032,
                      "y": 0.36944444444444446,
                      "isEnd": true
                  },
                  {
                      "x": 0.8266773162939297,
                      "y": 0.4125,
                      "isEnd": true
                  }
              ],
              "title": "",
              "pick": "",
              "pickers": [
                  "aaa",
              ],
              "isCurrPlayer": true,
              "isDrawingSubmitted": true,
              "isTitleSubmitted": true,
              "isPickSubmitted": true
          },
          {
              "name": "ccc",
              "phase": 5,
              "isLeader": false,
              "score": 0,
              "prompt": "jesus slept",
              "drawing": [
                  {
                      "x": 0.5746779388083736,
                      "y": 0.5138888888888888,
                      "isEnd": false
                  },
                  {
                      "x": 0.5746779388083736,
                      "y": 0.5152777777777777,
                      "isEnd": true
                  },
                  {
                      "x": 0.5746779388083736,
                      "y": 0.5166666666666667,
                      "isEnd": true
                  },
                  {
                      "x": 0.5666264090177133,
                      "y": 0.5194444444444445,
                      "isEnd": true
                  },
                  {
                      "x": 0.5243558776167472,
                      "y": 0.5277777777777778,
                      "isEnd": true
                  },
                  {
                      "x": 0.41767310789049916,
                      "y": 0.5333333333333333,
                      "isEnd": true
                  },
                  {
                      "x": 0.31300322061191627,
                      "y": 0.5402777777777777,
                      "isEnd": true
                  },
                  {
                      "x": 0.2143719806763285,
                      "y": 0.5361111111111111,
                      "isEnd": true
                  },
                  {
                      "x": 0.12379227053140096,
                      "y": 0.5222222222222223,
                      "isEnd": true
                  },
                  {
                      "x": 0.06541867954911433,
                      "y": 0.5027777777777778,
                      "isEnd": true
                  },
                  {
                      "x": 0.029186795491143315,
                      "y": 0.48194444444444445,
                      "isEnd": true
                  },
                  {
                      "x": 0.007045088566827697,
                      "y": 0.4513888888888889,
                      "isEnd": true
                  },
                  {
                      "x": 0.7216183574879227,
                      "y": 0.13472222222222222,
                      "isEnd": false
                  },
                  {
                      "x": 0.7115539452495974,
                      "y": 0.13472222222222222,
                      "isEnd": true
                  },
                  {
                      "x": 0.6773349436392915,
                      "y": 0.12777777777777777,
                      "isEnd": true
                  },
                  {
                      "x": 0.6350644122383252,
                      "y": 0.11527777777777778,
                      "isEnd": true
                  },
                  {
                      "x": 0.6068840579710145,
                      "y": 0.10416666666666667,
                      "isEnd": true
                  },
                  {
                      "x": 0.5988325281803543,
                      "y": 0.10138888888888889,
                      "isEnd": true
                  },
                  {
                      "x": 0.5968196457326892,
                      "y": 0.1,
                      "isEnd": true
                  },
                  {
                      "x": 0.5968196457326892,
                      "y": 0.09861111111111111,
                      "isEnd": true
                  },
                  {
                      "x": 0.6068840579710145,
                      "y": 0.1,
                      "isEnd": true
                  },
                  {
                      "x": 0.6370772946859903,
                      "y": 0.10694444444444444,
                      "isEnd": true
                  },
                  {
                      "x": 0.6873993558776167,
                      "y": 0.12083333333333333,
                      "isEnd": true
                  },
                  {
                      "x": 0.7598631239935587,
                      "y": 0.14305555555555555,
                      "isEnd": true
                  },
                  {
                      "x": 0.8283011272141707,
                      "y": 0.16944444444444445,
                      "isEnd": true
                  },
                  {
                      "x": 0.874597423510467,
                      "y": 0.19722222222222222,
                      "isEnd": true
                  },
                  {
                      "x": 0.8967391304347826,
                      "y": 0.22083333333333333,
                      "isEnd": true
                  },
                  {
                      "x": 0.9208937198067633,
                      "y": 0.25277777777777777,
                      "isEnd": true
                  },
                  {
                      "x": 0.9329710144927535,
                      "y": 0.2902777777777778,
                      "isEnd": true
                  },
                  {
                      "x": 0.9369967793880837,
                      "y": 0.3263888888888889,
                      "isEnd": true
                  },
                  {
                      "x": 0.9369967793880837,
                      "y": 0.37222222222222223,
                      "isEnd": true
                  },
                  {
                      "x": 0.9249194847020934,
                      "y": 0.425,
                      "isEnd": true
                  },
                  {
                      "x": 0.8927133655394525,
                      "y": 0.49166666666666664,
                      "isEnd": true
                  },
                  {
                      "x": 0.8484299516908212,
                      "y": 0.5569444444444445,
                      "isEnd": true
                  },
                  {
                      "x": 0.8001207729468599,
                      "y": 0.6180555555555556,
                      "isEnd": true
                  },
                  {
                      "x": 0.7618760064412238,
                      "y": 0.6666666666666666,
                      "isEnd": true
                  },
                  {
                      "x": 0.7075281803542673,
                      "y": 0.7097222222222223,
                      "isEnd": true
                  },
                  {
                      "x": 0.6390901771336553,
                      "y": 0.7472222222222222,
                      "isEnd": true
                  },
                  {
                      "x": 0.5827294685990339,
                      "y": 0.7722222222222223,
                      "isEnd": true
                  },
                  {
                      "x": 0.5485104669887279,
                      "y": 0.7888888888888889,
                      "isEnd": true
                  },
                  {
                      "x": 0.5364331723027375,
                      "y": 0.7972222222222223,
                      "isEnd": true
                  },
                  {
                      "x": 0.5364331723027375,
                      "y": 0.7986111111111112,
                      "isEnd": true
                  },
                  {
                      "x": 0.5364331723027375,
                      "y": 0.7972222222222223,
                      "isEnd": true
                  },
                  {
                      "x": 0.5324074074074074,
                      "y": 0.7902777777777777,
                      "isEnd": true
                  },
                  {
                      "x": 0.5283816425120773,
                      "y": 0.7833333333333333,
                      "isEnd": true
                  },
                  {
                      "x": 0.520330112721417,
                      "y": 0.775,
                      "isEnd": true
                  },
                  {
                      "x": 0.5142914653784219,
                      "y": 0.7638888888888888,
                      "isEnd": true
                  },
                  {
                      "x": 0.5042270531400966,
                      "y": 0.7555555555555555,
                      "isEnd": true
                  },
                  {
                      "x": 0.49013687600644124,
                      "y": 0.7472222222222222,
                      "isEnd": true
                  },
                  {
                      "x": 0.47604669887278583,
                      "y": 0.7416666666666667,
                      "isEnd": true
                  },
                  {
                      "x": 0.47000805152979064,
                      "y": 0.7388888888888889,
                      "isEnd": true
                  },
                  {
                      "x": 0.4639694041867955,
                      "y": 0.7388888888888889,
                      "isEnd": true
                  },
                  {
                      "x": 0.43780193236714976,
                      "y": 0.7388888888888889,
                      "isEnd": true
                  },
                  {
                      "x": 0.3854669887278583,
                      "y": 0.7388888888888889,
                      "isEnd": true
                  },
                  {
                      "x": 0.3572866344605475,
                      "y": 0.7416666666666667,
                      "isEnd": true
                  },
                  {
                      "x": 0.3492351046698873,
                      "y": 0.7444444444444445,
                      "isEnd": true
                  },
                  {
                      "x": 0.3472222222222222,
                      "y": 0.7458333333333333,
                      "isEnd": true
                  },
                  {
                      "x": 0.3472222222222222,
                      "y": 0.75,
                      "isEnd": true
                  },
                  {
                      "x": 0.3492351046698873,
                      "y": 0.7541666666666667,
                      "isEnd": true
                  },
                  {
                      "x": 0.35124798711755234,
                      "y": 0.7597222222222222,
                      "isEnd": true
                  },
                  {
                      "x": 0.35124798711755234,
                      "y": 0.7680555555555556,
                      "isEnd": true
                  },
                  {
                      "x": 0.35124798711755234,
                      "y": 0.7847222222222222,
                      "isEnd": true
                  },
                  {
                      "x": 0.3572866344605475,
                      "y": 0.8041666666666667,
                      "isEnd": true
                  },
                  {
                      "x": 0.3713768115942029,
                      "y": 0.8319444444444445,
                      "isEnd": true
                  },
                  {
                      "x": 0.3975442834138486,
                      "y": 0.8694444444444445,
                      "isEnd": true
                  }
              ],
              "title": "bar",
              "pick": "aaa",
              "pickers": ['test1', 'test2'],
              "isCurrPlayer": false,
              "isDrawingSubmitted": true,
              "isTitleSubmitted": true,
              "isPickSubmitted": true
          }
      ],
      "currPlayer": 0,
      "titles": [
          "blue shoe",
          "among the bears",
          "jesus slept"
      ],
      "picks": [],
      "countdown": -1,
      "screenWidth": window.innerWidth,
      "screenHeight": window.innerHeight,
      "currPlayerIndex": 2
    }
    this.ctx = this.shadowRoot.querySelector('#score-canvas').getContext('2d')
    this.rc = rough.canvas(this.ctx.canvas)
    this.audio = new Audio()
    this.scoreAnimations = this.state.players
      .filter(p => (p.pickers.length > 0 && !p.isCurrPlayer))
      .map(p => new ScoreAnimation(
        p.title, 
        p.pickers, 
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
      this.actions.endScoreboard()
    }
  }

  draw() {
    const request = window.requestAnimationFrame(()=>this.draw())
    this.ctx.clearRect(0, 0, this.state.screenWidth, this.state.screenHeight)
    this.activeAnim.draw(this.ctx, this.rc)
  }

  static get styles() {
    return css`
      canvas {
        display: block;
      }`
  }
  render() {
    return html`
      <canvas id='score-canvas' width=${this.state.screenWidth} height=${this.state.screenHeight}></canvas>`
  }
})