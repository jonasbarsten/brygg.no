import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import moment from 'moment';
import { browserHistory } from 'react-router';

import Preloader from '../utilities/Preloader';

class EditCard extends Component {

	deleteCard () {
		Meteor.call('card.delete', this.props.card._id, (err, res) => {
			if (err) {
				console.log(err);
			}
			if (res) {
				console.log(res);
			}

			browserHistory.goBack();

		});
	}

	inviteCardHolder () {
		Meteor.call('card.inviteCardHolder', this.props.card._id, this.refs.email.value, (err, res) => {
			if (err) {
				console.log(err);
				this.refs.email.value = '';
			}

			if (!res.err) {
				Bert.alert(res.message, 'success', 'growl-bottom-right', 'fa-smile-o');
				this.refs.email.value = '';
			}

			if (res.err) {
				Bert.alert(res.message, 'danger', 'growl-bottom-right', 'fa-smile-o');
				this.refs.email.value = '';
			}
		});
	}

	render () {

		if (!this.props.card) {
			return <Preloader />
		}

		const card = this.props.card;
		const status = (card.inUse) ? `${card.cardHolder.firstName} ${card.cardHolder.lastName}` : 'Not in use';
		const inviteText = (card.inUse) ? 'Invite new holder to card' : 'Invite';
		const challenge = (card.cardHolder && card.cardHolder.challenge) ? card.cardHolder.challenge : '';

		return (
			<div className="container">
				<div className="row">
					<div className="col-xs-2">
						{card.number}
					</div>
					<div className="col-xs-4">
						{card.description}
					</div>
					<div className="col-xs-2">
						{moment(card.createdDate).format('YYYY-MM-DD')}
					</div>
					<div className="col-xs-2">
						{challenge}
					</div>
					<div className="col-xs-2">
						{status}
					</div>
				</div>
				<hr />

				<div className="row">
					<div className="col-xs-6">
						<input type="email" ref="email" placeholder="ringo@beatles.com" className="form-control"/>
					</div>
					<div className="col-xs-6 text-right">
						<button className="btn btn-success" onClick={this.inviteCardHolder.bind(this)}>{inviteText}</button>
					</div>
				</div>
				<hr />

				<div className="row text-right">
					<div className="col-xs-12">
						<button className="btn btn-danger" onClick={this.deleteCard.bind(this)}>Delete card</button>
					</div>
				</div>
			</div>
		);
	}
}

export default withTracker((props) => {
	Meteor.subscribe('cards');

	return {
		card: Cards.findOne({_id: props.params.cardId})
	}
})(EditCard);