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
		isDrawingSubmitted: false,
		isGuessSubmitted: false,
		isPickSubmitted: false
	}),
	
	Actions: update => ({
		submitName: name => {
			socket.emit('player-join', name, data => {
				if (data === false) {
					console.log('invalid name or wrong phase')
				} else {
					update(data)
				}
			})
		},

		submitDrawing: drawing => {
			console.log('submitDrawing called')
		},

		startGame: () => socket.emit('start-game'),
		changePhase: phase => update({ phase }),
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

		socket.on('phase-change', phase => actions.changePhase(phase))
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