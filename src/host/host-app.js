import { LitElement, html } from 'lit-element'
import O from 'patchinko/constant.mjs'

import GamePhase from '../GamePhaseClient'
import HostLobby from './host-lobby'
import HostDrawing from './host-drawing'
import HostGuessing from './host-guessing'
import HostPicking from './host-picking'
import HostScoreboard from './host-scoreboard'
import HostEndLobby from './host-endlobby'

const socket = io('http://localhost:8081')

const store = {
	Initial: () => ({
		phase: GamePhase.LOBBY,
		players: [],
		currPlayer: 0,
		guesses: [],
		picks: [],
		countdown: 30,
	}),

	Actions: update => ({
		sync: data => update(data),
		addPlayer: data => update(data)
	})
}

const update = flyd.stream()
const states = flyd.scan(O, store.Initial(), update)
const actions = store.Actions(update, socket)

customElements.define('host-app', class HostApp extends LitElement {
	static get properties() {
		return {
			state: { type: Object }
		}
	}
	constructor() {
		super()
		this.state = {}
	}

	firstUpdated() {
		states.map(state => this.state = { ...state })

		socket.emit('host-join', 'host', actions.sync)
		socket.on('host-sync', actions.sync)
	}

	render() {
		return html`
			<div class="app">
				${{
					[GamePhase.LOBBY]: html`<host-lobby .state=${this.state} .actions=${actions}></host-lobby>`,
					[GamePhase.DRAWING]: html`<host-drawing .state=${this.state} .actions=${actions}></host-drawing>`,
					[GamePhase.GUESSING]: html`<host-guessing .state=${this.state} .actions=${actions}></host-guessing>`,
					[GamePhase.PICKING]: html`<host-picking .state=${this.state} .actions=${actions}></host-picking>`,
					[GamePhase.SCOREBOARD]: html`<host-scoreboard .state=${this.state} .actions=${actions}></host-scoreboard>`,
					[GamePhase.ENDLOBBY]: html`<host-endlobby .state=${this.state} .actions=${actions}></host-endlobby>`
				}[this.state.phase]}
			</div>
		`
	}
})