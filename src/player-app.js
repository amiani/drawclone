import { LitElement, html } from 'lit-element'

customElements.define('player-app', class PlayerApp extends LitElement {
	firstUpdated() {
		const socket = io('http://localhost:8081')
	}

	render() {
		return html`
			<div class="app">
        <p>Here we are!</p>
			</div>
		`
	}
})