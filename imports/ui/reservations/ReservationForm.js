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

		const selectedDate = this.state.date.format('YYYY-MM-DD');
		const dayOfWeek = this.state.date.day();
		let hour = this.state.time.split(':')[0];
		let minute = this.state.time.split(':')[1];
		const now = moment();
		const currentDate = now.format('YYYY-MM-DD');

		if (selectedDate == currentDate) {
			if (now.hour() >= 14) {
				this.setState({loading: false});
				Bert.alert('Reserver før kl14 samme dag', 'warning', 'growl-bottom-right', 'fa-smile-o');
				return;
			}
		}

		hour = Number(hour);
		minute = Number(minute);

		if (this.refs.numberOfPeople.value < 6) {
			this.setState({loading: false});
			Bert.alert('Minimum 6 personer for å reservere', 'warning', 'growl-bottom-right', 'fa-smile-o');
			return;
		}

		// Ingen reservasjoner etter kl18 på fredager
		if (dayOfWeek == 5) {
			if (hour > 17) {
				Bert.alert('Kun reservasjoner før kl17 på fredager', 'warning', 'growl-bottom-right', 'fa-smile-o');
				this.setState({time: '17:00'});
				this.setState({loading: false});
				return;
			}
		}

		// Ingen reservasjoner etter kl20 på lørdager
		if (dayOfWeek == 6) {
			if (hour > 20) {
				Bert.alert('Kun reservasjoner før kl20 på lørdager', 'warning', 'growl-bottom-right', 'fa-smile-o');
				this.setState({time: '20:00'});
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
			Bert.alert('Alle felt er påkrevd', 'warning', 'growl-bottom-right', 'fa-smile-o');
			this.setState({loading: false});
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
			});
		}
		
	}

	render () {

		const button = this.state.loading ? <button className="btn btn-success" disabled>Sender ...</button> : <button className="btn btn-success" onClick={this.handleSubmit.bind(this)}>Send forespørsel</button>

		return (
			<div id="reservations-form-wrapper" className="row">

				<div id="reservations-form" className="text-center col-xs-12">

					<div className="panel panel-warning">
					  <div className="panel-heading">Reservasjonsskjemaet vårt er midlertidig ute av drift, send en e-post til <a href="mailto:post@brygg.no"><u>post@brygg.no</u></a> for å reservere.</div>
					</div>

					<div className="panel panel-info">
					  <div className="panel-heading">
					  	<p>Minimum 6 personer for å reservere.</p>
					  	<p>Du kan reservere til senest kl17 på fredager og kl20 på lørdager.</p>
					  	<p>Det må reserveres innen kl14 for reservasjon samme dag.</p>
					  </div>
					</div>

				</div>
			</div>
		);

		return (
			<div id="reservations-form-wrapper" className="row">

				<div id="reservations-form" className="text-center col-xs-12">

					<div className="panel panel-warning">
					  <div className="panel-heading">Dersom du får en bekreftelse på e-post om at vi vil svare innen 24 timer, men ikke hører noe mer fra oss etter det, så send gjerne hele e-posten til <a href="mailto:post@brygg.no"><u>post@brygg.no</u></a>. Da er vi sikre på at henvendelsen din kommer fram.</div>
					</div>

				</div>

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

						<div className="col-xs-12">
							<h6>Minimum 6 personer for å reservere</h6>
						</div>

						<div className="col-sm-8 col-sm-offset-2">
							<input 
								ref="numberOfPeople" 
								type="number" 
								className="form-control text-center"
								placeholder="antall personer"
								min="6"
							/>
						</div>
					</div>

					<br />

					<div className="row">
						<div className="col-xs-12">
							<h6>Du kan reservere til senest kl17 på fredager og kl20 på lørdager.</h6>
							<h6>Det må reserveres innen kl14 for reservasjon samme dag.</h6>
							<br />
						</div>
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