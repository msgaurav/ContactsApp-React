import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListContacts from './ListContacts'
import CreateContact from './CreateContact'
import * as ContactsAPI from './utils/ContactsAPI'

class App extends Component {
	state = {
		contacts: []
	}

	componentDidMount() {
		ContactsAPI.getAll().then((contacts) => {
			this.setState({ contacts })
		})
	}

	// Remove contact method
	removeContact = (contact) => {
		this.setState((currentState) => ({
			contacts: currentState.contacts.filter((c) => {
				return c.id !== contact.id
			})
		}))

		ContactsAPI.remove(contact)
	}

	// Create contact method
	createContact(contact) {
		ContactsAPI.create(contact).then(contact => {
			this.setState((currentState) => ({
				contacts: currentState.contacts.concat([ contact ])
			}))
		})
	}

	render() {
		return (
			<div>
				<Route exact path='/' render={() => (
					<ListContacts
						onDeleteContact={this.removeContact}
						contacts={this.state.contacts}
					/>
				)}/>

				<Route path='/create' render={({ history }) => (				// First curly braces are to allow us to have javascript inside of JSX. second brackets are to pass params to render function as object.
					<CreateContact
						onCreateContact={(contact) => {
							this.createContact(contact)
							history.push('/')
						}}
					/>
				)}/>
			</div>
		)
	}
}

export default App