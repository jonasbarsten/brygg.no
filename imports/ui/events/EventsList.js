import React, { Component } from 'react';
// import { createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';
import { browserHistory } from 'react-router';
import 'moment/locale/nb.js';

moment.locale('nb');
// import swal from 'sweetalert2';

// PROPS:
// onClick = 'view' || 'edit'
// range = 'upcoming' || 'past' || 'all'
// monthSeperator = true || false
// limit = number

class EventsList extends Component {

	constructor () {
		super ();
		this.state = {
			events: []
		}
	}

	componentDidMount () {

		Meteor.call('event.getFacebookEvents', (err, res) => {
			if (err) {
				console.log(err);
			} else {
				this.setState({
					events: res.data
				});
			}
		});
	}

	handleClick (event) {
		const url = `https://facebook.com/events/${event.id}/`;

		window.location = url;
	}

	// deleteEvent (id) {
	// 	swal({
	// 		title: 'Delete?',
	// 		text: "You will not be able to recover this event!",
	// 		type: 'warning',
	// 		showCancelButton: true,
	// 		confirmButtonColor: '#3085d6',
	// 		cancelButtonColor: '#d33',
	// 		confirmButtonText: 'Yes, delete it!'
	// 	}).then(() => {
	// 		Meteor.call('event.delete', id, (err, res) => {
	// 			if (err) {
	// 				console.log(err);
	// 				swal("Failed", "The event could not be deleted.", "warning");
	// 			} else {
	// 				Bert.alert('Event deleted', 'success', 'growl-bottom-right', 'fa-smile-o');
	// 			}
	// 		});
	// 	}).catch(swal.noop);
	// }

	render () {

		let events = this.state.events;

		function compare(a,b) {
		  if (a.start_time < b.start_time)
		    return -1;
		  if (a.start_time > b.start_time)
		    return 1;
		  return 0;
		}

		events.sort(compare);

		events.reverse();

		events.map((event) => {
			event.date = event.start_time;
		});

		if (this.props.limit) {
			events = events.slice(0, this.props.limit);
		}

		return (
			<div>
				{events.map((event, i) => {

					// event.date = event.start_time;

					const currentEventYear = moment(event.date).format('YYYY');
					const currentEventMonth = moment(event.date).format('MM');
					const previousEventMonth = (i > 0) ? moment(events[i - 1].date).format('MM') : 0;
					const previousEventYear = (i > 0) ? moment(events[i - 1].date).format('YYYY') : 0;

					const currentEventMonthSinceJesus = (currentEventYear * 12) + currentEventMonth;
					const pastEventMonthSinceJesus = (previousEventYear * 12) + previousEventMonth;

					const monthSeperatorWritten = moment(event.date).format('MMMM YYYY');

					const monthHeader = ((i == 0 || currentEventMonthSinceJesus < pastEventMonthSinceJesus) && this.props.monthSeparator) ? 
						<div className="col-xs-12 text-center calendar-month-seperator">{monthSeperatorWritten}</div> 
						: null;

					const odd = i % 2;
					const colorClass = odd ? 'event-color-b' : 'event-color-a';

					const date = moment(event.date).format('DD.MM');

					return (
						<div key={event.id}>
							{monthHeader}
							<div className={`${colorClass} col-sm-4 event-item hover`} onClick={this.handleClick.bind(this, event)}>
								<div className="event-item-content">

									<div className="row">
										<div style={{height: '50px', fontFamily: 'Plaak6Ney-26-Light'}} className="col-xs-6 col-sm-12 center-align-container">
											<span style={{fontSize: '40px'}}>{date}</span>
										</div>
										<div style={{height: '50px', fontFamily: 'Plaak4Terme-24-Light'}} className="col-xs-6 col-sm-12 center-align-container">
											<span style={{fontSize: '20px'}} className="text-center underline">{event.name}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					);

				})}
			</div>
		);

		// return (
		// 	<div>
		// 		{this.props.events.map((event, i) => {

		// 			const currentEventYear = moment(event.date).format('YYYY');
		// 			const currentEventMonth = moment(event.date).format('MM');
		// 			const previousEventMonth = (i > 0) ? moment(this.props.events[i - 1].date).format('MM') : 0;
		// 			const previousEventYear = (i > 0) ? moment(this.props.events[i - 1].date).format('YYYY') : 0;

		// 			const currentEventMonthSinceJesus = (currentEventYear * 12) + currentEventMonth;
		// 			const pastEventMonthSinceJesus = (previousEventYear * 12) + previousEventMonth;

		// 			const monthSeperatorWritten = moment(event.date).format('MMMM YYYY');
					
		// 			const monthHeader = (currentEventMonthSinceJesus > pastEventMonthSinceJesus && this.props.monthSeparator) ? 
		// 				<div className="col-xs-12 text-center calendar-month-seperator">{monthSeperatorWritten}</div> 
		// 				: null;

		// 			const odd = i % 2;
		// 			const colorClass = odd ? 'event-color-b' : 'event-color-a';

		// 			const date = moment(event.date).format('DD.MM');

		// 			return (
		// 				<div key={event._id}>
		// 					{monthHeader}
		// 					<div className={`${colorClass} col-sm-4 event-item hover`} onClick={this.handleClick.bind(this, event)}>
		// 						<div className="event-item-content">

		// 							<div className="row">
		// 								<div style={{height: '50px', fontFamily: 'Plaak6Ney-26-Light'}} className="col-xs-6 col-sm-12 center-align-container">
		// 									<span style={{fontSize: '40px'}}>{date}</span>
		// 								</div>
		// 								<div style={{height: '50px', fontFamily: 'Plaak4Terme-24-Light'}} className="col-xs-6 col-sm-12 center-align-container">
		// 									<span style={{fontSize: '20px'}} className="text-center underline">{event.name}</span>
		// 								</div>
		// 							</div>
		// 						</div>
		// 					</div>
		// 				</div>
		// 			);
		// 		})}
		// 	</div>
		// );
	}
}


export default EventsList;