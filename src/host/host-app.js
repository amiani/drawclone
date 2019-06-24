import { LitElement, html } from 'lit-element'
import O from 'patchinko/constant.mjs'

import GamePhase from '../GamePhaseClient'
import HostLobby from './host-lobby'
import HostDrawing from './host-drawing'
import HostGuessing from './host-guessing'
import HostPicking from './host-picking'

const socket = io('http://localhost:8081')

const store = {
	Initial: () => ({
		phase: GamePhase.LOBBY,
		players: [],
		guesses: [],
		picks: []
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

	sync(data) { actions.sync(data) }

	firstUpdated() {
		states.map(state => this.state = { ...state })

		socket.emit('host-join', 'host', this.sync)
		socket.on('change-phase', this.sync)
		socket.on('player-joined', this.sync)
		socket.on('sync', this.sync)
	}

	render() {
		return html`
			<div class="app">
				${{
					[GamePhase.LOBBY]: html`<host-lobby .state=${this.state} .actions=${actions}></host-lobby>`,
					[GamePhase.DRAWING]: html`<host-drawing .state=${this.state} .actions=${actions}></host-drawing>`,
					[GamePhase.GUESSING]: html`<host-guessing .state=${this.state} .actions=${actions}></host-guessing>`,
					[GamePhase.PICKING]: html`<host-picking .state=${this.state} .actions=${actions}></host-picking>`,
					[GamePhase.SCOREBOARD]: html`<host-scoreboard .state=${this.state} .actions=${actions}></host-scoreboard>`
				}[this.state.phase]}
			</div>
		`
	}
})