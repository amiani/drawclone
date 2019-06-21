import { LitElement, html } from 'lit-element'
import O from 'patchinko/constant.mjs'

import PlayerLobby from './player-lobby'

const socket = io('http://localhost:8081')
const store = {
	Initial: () => ({
		name: '',
	}),
	
	Actions: update => ({
		submitName: name => {
			socket.emit('player-join', name, data => {
				if (data === true)
					update({ name })
			})
		}
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
	}

	render() {
		return html`
			<div class="app">
				<player-lobby .state=${this.state} .actions=${actions}></player-lobby>
			</div>
		`
	}
})