import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

class RegisterCard extends Component {

	handleKeyPress (event) {
		if(event.key == 'Enter'){
			this.handleSubmit();
		}
	}

	handleSubmit () {

		// Fetch data from form
		const email = this.refs.emailAddress.value;
		const firstName = this.refs.firstName.value;
		const lastName = this.refs.lastName.value;
		const token = this.props.params.token;

		// Validate

		check(email, ValidEmail);
		check(firstName, String);
		check(lastName, String);
		check(token, String);

		// Make user object

		let cardHolder = {
			'email': email,
			'firstName': firstName,
			'lastName': lastName,
			'token': token
		}

		// Check token (creating user and giving role 'invited' in method if token matches)

		Meteor.call('card.registerCard', cardHolder, (err, res) => {
			if (err) {
				console.log(err);
			}

			if (res.err) {
				Bert.alert(res.message, 'danger', 'growl-bottom-right', 'fa-frown-o');
				this.refs.emailAddress.value = '';
				this.refs.firstName.value = '';
				this.refs.lastName.value = '';
			}

			if (!res.err) {
				Bert.alert(res.message, 'success', 'growl-bottom-right', 'fa-smile-o');
				browserHistory.push('/');
			}
		});
	}

	render () {
		return (
			<div className="text-center" onKeyPress={this.handleKeyPress.bind(this)}>

				<h4>Regiser for your card!</h4>

				<br />

				<div className="row">
					<div className="col-sm-8 col-sm-offset-2">
						<input 
							ref="firstName" 
							type="text" 
							className="form-control text-center"
							placeholder="first name"
						/>
					</div>
				</div>

				<br />

				<div className="row">
					<div className="col-sm-8 col-sm-offset-2">
						<input 
							ref="lastName" 
							type="text" 
							className="form-control text-center"
							placeholder="last name"
						/>
					</div>
				</div>

				<br />

				<div className="row">
					<div className="col-sm-8 col-sm-offset-2">
						<input 
							ref="emailAddress" 
							type="email" 
							className="form-control text-center"
							placeholder="email"
						/>
					</div>
				</div>

				<br />

				<div className="row">
					<div className="col-sm-8 col-sm-offset-2">
						<button className="btn btn-success" onClick={this.handleSubmit.bind(this)}>GO!</button>
					</div>
				</div>
			
			</div>
		);
	}
};

export default RegisterCard;