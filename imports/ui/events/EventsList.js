import React, { Component } from 'react';
import moment from 'moment';
import { browserHistory } from 'react-router';
import 'moment/locale/nb.js';
import _ from 'underscore';

moment.locale('nb');

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

	render () {

		let events = this.state.events;

		events.map((event) => {
			event.date = event.start_time;
		});

		// Group by "month year"
		events = _.groupBy(events, (event) => {
			return moment(event.date).format('MMMM YYYY');
		});

		// Sort by "month year"
		events = _.sortBy(events, (eventsInMonth, i) => {
			return moment(i, "MMMM YYYY").toDate();
		});

		// Newest month (furthest from year 0) first
		events.reverse();

		// Sort events inside each month
		events.map((eventsInMonth, i) => {
			events[i] = _.sortBy(eventsInMonth, (event) => {
				return moment(event.date).toDate();
			});
		});

		// Remove key
		events = _.flatten(events);


		if (this.props.limit) {

			let closestUpcomingEvent = null;

			for (var i = 0; i < events.length; i++) {
				if (!closestUpcomingEvent) {
					if (moment(events[i].date).isSameOrAfter(new Date())) {
						closestUpcomingEvent = i;
					}
				}
			}

			if (!closestUpcomingEvent) {
				events = events.slice(0, this.props.limit);
			} else {

				// TODO: FIX THIS STUFF!
				// SORTER LISTA BARE PÅ DATOER, IKKE PÅ MÅNEDER HER!!!
				// I'm thinking: check if there are any more upcoming events, up to limit, if so, render them, if not, compensate backwards.
				// Also consider if closestUpcomingEvent = null, in the case there are no upcoming events.


				events = events.slice(0, this.props.limit);
			}
		}

		return (
			<div>
				{events.map((event, i) => {

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
	}
}


export default EventsList;