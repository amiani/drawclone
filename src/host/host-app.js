import { LitElement, html, css } from 'lit-element'
import O from 'patchinko/constant.mjs'

import GamePhase from '../GamePhaseClient'
import HostLobby from './host-lobby'
import HostDrawing from './host-drawing'
import HostTitling from './host-titling'
import HostPicking from './host-picking'
import HostScoreboard from './host-scoreboard'
import HostEndLobby from './host-endlobby'

const socket = io('http://localhost:8081')

const store = {
	Initial: () => ({
		phase: GamePhase.LOBBY,
		players: [],
		currPlayer: 0,
		titles: [],
		picks: [],
		countdown: 30,
		screenWidth: 100,
		screenHeight: 100,
	}),

	Actions: update => ({
		sync: data => update(data),
		addPlayer: data => update(data),
		resize: (screenWidth, screenHeight) => update({ screenWidth, screenHeight })
	})
}

const update = flyd.stream()
const states = flyd.scan(O, store.Initial(), update)
const actions = store.Actions(update, socket)
meiosisTracer({ streams: [states] })

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
		window.addEventListener('resize', this.handleResize)
		actions.resize(window.innerWidth, window.innerHeight)
	}

	disconnectedCallback() {
		window.removeEventListener('resize', this.handleResize)
	}

	handleResize(e) { actions.resize(window.innerWidth, window.innerHeight) }

	static get styles() {
		return css`
			.app {
				display: flex;
				justify-content: center;
			}
		`
	}
	render() {
		return html`
			<div class="app">
				${{
					[GamePhase.LOBBY]: html`<host-lobby .state=${this.state} .actions=${actions}></host-lobby>`,
					[GamePhase.DRAWING]: html`<host-drawing .state=${this.state} .actions=${actions}></host-drawing>`,
					[GamePhase.TITLING]: html`<host-titling .state=${this.state} .actions=${actions}></host-titling>`,
					[GamePhase.PICKING]: html`<host-picking .state=${this.state} .actions=${actions}></host-picking>`,
					[GamePhase.SCOREBOARD]: html`<host-scoreboard .state=${this.state} .actions=${actions}></host-scoreboard>`,
					[GamePhase.ENDLOBBY]: html`<host-endlobby .state=${this.state} .actions=${actions}></host-endlobby>`
				}[4]}
			</div>
		`
	}
})