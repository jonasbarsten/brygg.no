import React, { Component } from 'react';
import { DayPickerSingleDateController } from 'react-dates';
import TimeInput from 'react-time-input';
import moment from 'moment';
import { browserHistory } from 'react-router';

import LoaderButton from '../utilities/LoaderButton';
import 'moment/locale/nb.js';

moment.locale('nb');

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
// import 'react-time-input/src/style.css';


class ReservationForm extends Component {

	constructor () {
		super ();
		this.state = {
			date: moment(),
			focused: false,
			time: '',
			loading: false
		}
	}

	componentDidMount () {
		$(window).scrollTop();
	}

	// handleKeyPress (event) {
	// 	if(event.key == 'Enter'){
	// 		this.handleSubmit();
	// 	}
	// }

	handleSubmit () {

		this.setState({loading: true});

		const dayOfWeek = this.state.date.day();
		let hour = this.state.time.split(':')[0];
		let minute = this.state.time.split(':')[1];

		hour = Number(hour);
		minute = Number(minute);

		// Ingen reservasjoner etter kl18 på fredager
		if (dayOfWeek == 5) {
			if (hour >= 18) {
				Bert.alert('Kun reservasjoner før kl18 på fredager', 'warning', 'growl-bottom-right', 'fa-smile-o');
				this.setState({time: '17:59'});
				this.setState({loading: false});
				return;
			}
		}

		// Ingen reservasjoner etter kl20 på lørdager
		if (dayOfWeek == 6) {
			if (hour >= 20) {
				Bert.alert('Kun reservasjoner før kl20 på lørdager', 'warning', 'growl-bottom-right', 'fa-smile-o');
				this.setState({time: '19:59'});
				this.setState({loading: false});
				return;
			}
		}

		const reservationRequest = {
			name: this.refs.name.value,
			email: this.refs.email.value,
			mobile: this.refs.mobile.value,
			numberOfPeople: this.refs.numberOfPeople.value,
			date: this.state.date.format('YYYY-MM-DD'),
			time: this.state.time,
			comment: this.refs.comment.value
		}

		if (
			reservationRequest.name.length == 0 ||
			reservationRequest.email.length == 0 ||
			reservationRequest.mobile.length == 0 ||
			reservationRequest.numberOfPeople == 0 ||
			reservationRequest.date.length == 0 ||
			reservationRequest.time.length == 0 ||
			reservationRequest.comment.length == 0
			) {
			Bert.alert('All fields are required', 'danger', 'growl-bottom-right', 'fa-frown-o');
		} else {

			check(reservationRequest.name, String);
			check(reservationRequest.email, ValidEmail);
			check(reservationRequest.mobile, String);
			check(reservationRequest.numberOfPeople, String);
			check(reservationRequest.date, String);
			check(reservationRequest.time, String);
			check(reservationRequest.comment, String);

			Meteor.call('reservation.request', reservationRequest, (err, res) => {
				if (err) {
					console.log(err);
				} else {
					this.setState({loading: false});
					Bert.alert('Din forespørsel ble sendt!', 'success', 'growl-bottom-right', 'fa-smile-o');
					browserHistory.push('/');
				}
			})
		}
		
	}

	render () {

		const button = this.state.loading ? <button className="btn btn-success" disabled>Sender ...</button> : <button className="btn btn-success" onClick={this.handleSubmit.bind(this)}>Send forespørsel</button>

		return (
			<div id="reservations-form-wrapper" className="row">
				<div id="reservations-form" className="text-center col-xs-12">

					<h4>Send inn forespørsel</h4>

					<br />

					<div className="row">
						<div className="col-sm-8 col-sm-offset-2">
							<input 
								ref="name" 
								type="text" 
								className="form-control text-center"
								placeholder="navn"
							/>
						</div>
					</div>

					<br />

					<div className="row">
						<div className="col-sm-8 col-sm-offset-2">
							<input 
								ref="email" 
								type="email" 
								className="form-control text-center"
								placeholder="epost"
							/>
						</div>
					</div>

					<br />

					<div className="row">
						<div className="col-sm-8 col-sm-offset-2">
							<input 
								ref="mobile" 
								type="tel" 
								className="form-control text-center"
								placeholder="telefonnummer"
							/>
						</div>
					</div>

					<br />

					<div className="row">
						<div className="col-sm-8 col-sm-offset-2">
							<input 
								ref="numberOfPeople" 
								type="text" 
								className="form-control text-center"
								placeholder="antall personer"
							/>
						</div>
					</div>

					<br />

					<div className="row">
						<div className="col-sm-8 col-sm-offset-2">
							<div className="col-md-6 col-xs-12">
								<div className="row reservation-datepicker">
									<DayPickerSingleDateController
									  date={this.state.date} // momentPropTypes.momentObj or null
									  onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
									  focused={this.state.focused} // PropTypes.bool
									  onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
									  firstDayOfWeek={1}
									  hideKeyboardShortcutsPanel={true}
									/>
								</div>
							</div>
							<div className="col-md-6 col-xs-12">
								<h4>Klokkeslett</h4>
								<TimeInput
						   			initTime={this.state.time}
						   			className='form-control text-center'
						   			onTimeChange={time => this.setState({ time })}
						   		/>
						   		<br />
						   		<h4>Kommentar</h4>
						   		<textarea 
						   			ref="comment" 
						   			className="form-control"
						   			placeholder="Kommentar"
						   			style={{minHeight: '204px'}}
						   		/>
							</div>
						</div>
					</div>



					<br />
					
					<div className="row">
						<div className="col-sm-8 col-sm-offset-2">
							
						</div>
					</div>

					<br />

					<div className="row">
						<div className="col-sm-8 col-sm-offset-2">
							{button}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ReservationForm;