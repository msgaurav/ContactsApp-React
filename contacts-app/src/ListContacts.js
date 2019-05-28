import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListContacts extends Component {
	static propTypes = {
		contacts: PropTypes.array.isRequired,
		onDeleteContact: PropTypes.func.isRequired
	}

	state = {
		query: ''
	}

	updateQuery = (query) => {
		this.setState({
			query: query.trim()
		})
	}

	// Reset query & Showing all contacts method
	clearQuery = () => {
		this.setState({					// you can call this method as well: this.updateQuery('')
			query: ''
		})
	}

	render() {

		// Object Destructuring
		const { contacts, onDeleteContact } = this.props
		const { query } = this.state

		// Display Queried Contacts
		let showingContacts
		if (query) {					//	query declare as truthy value
			const match = new RegExp(escapeRegExp(query), 'i')
			showingContacts = contacts.filter((c) => match.test(c.name))
		} else {
			showingContacts = contacts
		}

		// Sort By contacts.name
		showingContacts.sort(sortBy('name'))

		return (
			<div className='list-contacts'>

				<div className='list-contacts-top'>
					<input
						className='search-contacts'
						type="text"
						placeholder='Search Contact'
						value={query}
						onChange={(event) => this.updateQuery(event.target.value)}
					/>
					<Link
						to='/create'
						className='add-contact'
					>Add Contact</Link>
				</div>

				{/* Reset & Showing all Contacts with 'Inline If with Logical && Operator' method */}
				{showingContacts.length !== contacts.length && (
					<div className='showing-contacts'>
						<span>Now showing {showingContacts.length} of {contacts.length} total</span>
						<button onClick={this.clearQuery}>Show all</button>
					</div>
				)}

				<ol className='contact-list'>
					{showingContacts.map((contact) => (
						<li key={contact.id} className='contact-list-item'>
							<div
								className='contact-avatar'
								style={{backgroundImage: `url(${contact.avatarURL})`}}>
							</div>
							<div className='contact-details'>
								<p>{contact.name}</p>
								<p>{contact.email}</p>
							</div>
							<button
								onClick={() => onDeleteContact(contact)}
								className='contact-remove'>
								Remove
							</button>
						</li>
					))}
				</ol>

			</div>
		)
	}
}

export default ListContacts