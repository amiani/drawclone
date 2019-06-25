import { LitElement, html } from 'lit-element'
import O from 'patchinko/constant.mjs'

import GamePhase from '../GamePhaseClient'
import PlayerLobby from './player-lobby'
import PlayerDrawing from './player-drawing'
import PlayerGuessing from './player-guessing'
import PlayerPicking from './player-picking'

const socket = io('http://localhost:8081')
const store = {
	Initial: () => ({
		phase: GamePhase.LOBBY,
		name: '',
		isLeader: false,
		score: 0,
		prompt: '',
		drawing: [],
		guesses: [],
		isDrawingSubmitted: false,
		isGuessSubmitted: false,
		isPickSubmitted: false
	}),
	
	Actions: update => ({
		submitName: name => {
			socket.emit('player-join', name, data => {
				if (data.error) {
					console.log(data.error.msg)
				} else {
					update(data)
				}
			})
		},
		startGame: () => socket.emit('start-game'),

		addVertex: (x, y, isEnd) => update({ drawing: O(d => [...d, { x, y, isEnd }]) }),
		submitDrawing: drawing => {
			socket.emit('submit-drawing', drawing, data => {
				if (data.error) console.error(data.error.msg)
				else update(data)
			})
		},

		submitGuess: guess => {
			socket.emit('submit-guess', guess, data => {
				if (data.error) console.error(data.error.msg)
				else update(data)
			})
		},

		submitPick: pick => {
			socket.emit('submit-pick', pick, data => {
				if (data.error) console.error(data.error.msg)
				else update(data)
			})
		},

		sync: data => update(data)
	})
}

const update = flyd.stream()
const states = flyd.scan(O, store.Initial(), update)
const actions = store.Actions(update, socket)

customElements.define('player-app', class PlayerApp extends LitElement {
	static get properties() {
		return {
			state: { type: Object }
		}
	}
	constructor() {
		super()
		this.state = states()
	}

	firstUpdated() {
		states.map(state => this.state = { ...state })
		socket.on('player-sync', actions.sync)
	}

	render() {
		return html`
			<div class="app">
				${{
					[GamePhase.LOBBY]: html`<player-lobby .state=${this.state} .actions=${actions}></player-lobby>`,
					[GamePhase.DRAWING]: html`<player-drawing .state=${this.state} .actions=${actions}></player-drawing>`,
					[GamePhase.GUESSING]: html`<player-guessing .state=${this.state} .actions=${actions}></player-guessing>`,
					[GamePhase.PICKING]: html`<player-picking .state=${this.state} .actions=${actions}></player-picking>`,
					[GamePhase.SCOREBOARD]: html`<p>Player Scoreboard Phase</p>`
				}[this.state.phase]}
			</div>
		`
	}
})