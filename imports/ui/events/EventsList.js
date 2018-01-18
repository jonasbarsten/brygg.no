import React, { Component } from 'react';
import moment from 'moment';
import { browserHistory } from 'react-router';
import 'moment/locale/nb.js';
import _ from 'underscore';

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

		events.map((event) => {
			event.date = event.start_time;
		});

		events = _.shuffle(events);

		// Group by "month - year"
		let eventsByMonth = _.groupBy(events, (event) => {return moment(event.date).format('MMMM YYYY')});

		// Sort by "month - year"
		eventsByMonth = _.sortBy(eventsByMonth, (eventsInMonth, i) => {
			return moment(i, "MMMM YYYY").toDate()
		});

		// Newest month (furthest from year 0) first
		eventsByMonth.reverse();

		// Sorting the events insite each month
		eventsByMonth.map((eventsInMonth, i) => {
			eventsByMonth[i] = _.sortBy(eventsInMonth, (event) => {
				return moment(event.date).toDate();
			});
		});

		eventsByMonth = _.flatten(eventsByMonth);

		events = eventsByMonth;



		// console.log(eventsByMonth);

		// _.flatten(_.map(events, (eventsInMonth) => { _.sortBy(eventsInMonth, (event) => { moment(event.date).toDate()}), _.sortBy(_.keys(eventsByMonth))}));

		// _.flatten(_.map((itemsInMonth) => _.sortBy(itemsInMonth, (event) => {return event.dateObject.getTime()}), _.sort(_.keys(itemsByMonth)));

		// console.log(events);


	    // Set up our variables, 2 date objects and a map of month names/numbers
	    // var ad = new Date(),
	    //     bd = new Date(),
	    //     months = {
	    //         Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
	    //         Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov:10, Dec:12
	    //     };

	    // events.sort(function (a, b) {
	    //     // Split the text into [ date, month ]
	    //     var as = a.split(' '),
	    //         bs = b.split(' ');

	    //     // Set the Date() objects to the dates of the items
	    //     ad.setDate(as[0]);
	    //     ad.setMonth(months[as[1]]);
	    //     bd.setDate(bs[0]);
	    //     bd.setMonth(months[bs[1]]);

	    //     /* A math operation converts a Date object to a number, so 
	    //        it's enough to just return date1 - date2 */
	    //     return ad - bd;
	    // });


		// function compare(a, b) {
		// 	if (a.date < b.date) {
		// 		return -1;
		// 	}
		// 	if (a.date > b.date) {
		// 		return 1;
		// 	}
		// 	return 0;
		// };

		// events.sort(compare);

		// events.reverse();

		// if (this.props.limit) {
		// 	events = events.slice(0, this.props.limit);
		// }

		// calendarObject = {};

		// events.map((event, i) => {
		// 	const currentEventYear = moment(event.date).format('YYYY');
		// 	const currentEventMonth = moment(event.date).format('MM');
		// 	const previousEventMonth = (i > 0) ? moment(events[i - 1].date).format('MM') : 0;
		// 	const previousEventYear = (i > 0) ? moment(events[i - 1].date).format('YYYY') : 0;

		// 	const currentEventMonthSinceJesus = (currentEventYear * 12) + currentEventMonth;
		// 	const pastEventMonthSinceJesus = (previousEventYear * 12) + previousEventMonth;

		// 	const monthSeperatorWritten = moment(event.date).format('MMMM YYYY');

		// 	if (i == 0 || currentEventMonthSinceJesus < pastEventMonthSinceJesus) {

				
		// 		calendarObject[monthSeperatorWritten] = [];
				
		// 	}

		// 	calendarObject[monthSeperatorWritten].push(event);

		// });

		// Object.keys(calendarObject).map((key, index) => {
		// 	calendarObject[key].sort(compare);
		// });

		// return (
		// 	<div>
		// 		{Object.keys(calendarObject).map((key, index) => {
		// 			calendarObject[key].map((event, i) => {

		// 				const currentEventYear = moment(event.date).format('YYYY');
		// 				const currentEventMonth = moment(event.date).format('MM');
		// 				const previousEventMonth = (i > 0) ? moment(events[i - 1].date).format('MM') : 0;
		// 				const previousEventYear = (i > 0) ? moment(events[i - 1].date).format('YYYY') : 0;

		// 				const currentEventMonthSinceJesus = (currentEventYear * 12) + currentEventMonth;
		// 				const pastEventMonthSinceJesus = (previousEventYear * 12) + previousEventMonth;

		// 				const monthSeperatorWritten = moment(event.date).format('MMMM YYYY');

		// 				const monthHeader = ((i == 0 || currentEventMonthSinceJesus < pastEventMonthSinceJesus) && this.props.monthSeparator) ? 
		// 					<div className="col-xs-12 text-center calendar-month-seperator">{monthSeperatorWritten}</div> 
		// 					: null;

		// 				const odd = i % 2;
		// 				const colorClass = odd ? 'event-color-b' : 'event-color-a';

		// 				const date = moment(event.date).format('DD.MM');

		// 				let name = event.name;

		// 				if (name.length > 25) {
		// 					name = name.substring(0,25) + ' ...';
		// 				}

		// 				return (
		// 					<div key={event.id}>
		// 						{monthHeader}
		// 						<div className={`${colorClass} col-sm-4 event-item hover`} onClick={this.handleClick.bind(this, event)}>
		// 							<div className="event-item-content">

		// 								<div className="row">
		// 									<div style={{height: '50px', fontFamily: 'Plaak6Ney-26-Light'}} className="col-xs-6 col-sm-12 center-align-container">
		// 										<span style={{fontSize: '40px'}}>{date}</span>
		// 									</div>
		// 									<div style={{height: '50px', fontFamily: 'Plaak4Terme-24-Light'}} className="col-xs-6 col-sm-12 center-align-container">
		// 										<span style={{fontSize: '20px'}} className="text-center underline">{name}</span>
		// 									</div>
		// 								</div>
		// 							</div>
		// 						</div>
		// 					</div>
		// 				);
		// 			});
		// 		})}

		// 	</div>
		// );


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

					let name = event.name;
					if (name.length > 25) name = name.substring(0,25) + ' ...';

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
											<span style={{fontSize: '20px'}} className="text-center underline">{name}</span>
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