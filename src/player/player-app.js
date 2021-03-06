import { LitElement, html, css } from 'lit-element'
import O from 'patchinko/constant.mjs'

import GamePhase from '../GamePhaseClient'
import PlayerLobby from './player-lobby'
import PlayerDrawing from './player-drawing'
import PlayerTitling from './player-titling'
import PlayerPicking from './player-picking'
import PlayerEndLobby from './player-endlobby'

const socket = io('http://192.168.0.105:8081/karaku')
const store = {
	Initial: () => ({
		phase: GamePhase.LOBBY,
		name: '',
		isLeader: false,
		score: 0,
		prompt: '',
		drawing: [],
		titles: [],
		isCurrPlayer: false,
		isDrawingSubmitted: false,
		isTitleSubmitted: false,
		isPickSubmitted: false
	}),
	
	Actions: update => ({
		join: (name, room) => {
			socket.emit('player-join', { name, room }, data => {
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

		submitTitle: title => {
			socket.emit('submit-title', title, data => {
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

		restartGame: () => socket.emit('restart-game'),
		newPlayers: () => socket.emit('new-players'),

		sync: data => update(data)
	})
}

const update = flyd.stream()
const states = flyd.scan(O, store.Initial(), update)
const actions = store.Actions(update, socket)
meiosisTracer({ streams: [states] })

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

	static get styles() {
		return css`
			.app {
				width: 100vw;
				height: 100vh;
				margin: 0;
				display: flex;
				flex-direction: column;
				justify-content: center;
      }
      
      p { 
        text-align: center;
      }
		`
	}
	render() {
		return html`
			<div class="app">
				${{
					[GamePhase.LOBBY]: html`<player-lobby .state=${this.state} .actions=${actions}></player-lobby>`,
					[GamePhase.DRAWING]: html`<player-drawing .state=${this.state} .actions=${actions}></player-drawing>`,
					[GamePhase.TITLING]: html`<player-titling .state=${this.state} .actions=${actions}></player-titling>`,
					[GamePhase.PICKING]: html`<player-picking .state=${this.state} .actions=${actions}></player-picking>`,
					[GamePhase.SCOREBOARD]: html`<p>check out those scores!</p>`,
					[GamePhase.ENDLOBBY]: html`<player-endlobby .state=${this.state} .actions=${actions}></player-endlobby>`,
				}[this.state.phase]}
			</div>
		`
	}
})