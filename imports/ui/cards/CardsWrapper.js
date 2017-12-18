import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Link } from 'react-router';

import AddSingleCard from './AddSingleCard';
import AddCardRange from './AddCardRange';

class CardsWrapper extends Component {

	render () {
		return (
			<div className="container">
				<h4>Add single card</h4>
				<AddSingleCard />
				<hr />
				<h4>Add card range</h4>
				<AddCardRange />
				<hr />
				{this.props.cards.map((card) => {

					const url = '/admin/cards/edit/' + card._id;
					const status = (card.inUse) ? `${card.cardHolder.firstName} ${card.cardHolder.lastName}` : 'Not in use';
					const color = (card.inUse) ? 'green' : 'orange';
					const challenge = (card.cardHolder && card.cardHolder.challenge) ? card.cardHolder.challenge : '';

					return (
						<Link key={card._id} to={url}>
							<div className='row card-item' style={{backgroundColor: color}}>
								<div className="col-xs-2">{card.number}</div>
								<div className="col-xs-4">{challenge}</div>
								<div className="col-xs-4">{card.description}</div>
								<div className="col-xs-2 text-right">{status}</div>
							</div>
						</Link>
					);
				})}
			</div>
		);
	}
};

export default createContainer(() => {
	Meteor.subscribe('cards');

	return {
		cards: Cards.find({}, {sort: {number: 1}}).fetch()
	}
}, CardsWrapper);