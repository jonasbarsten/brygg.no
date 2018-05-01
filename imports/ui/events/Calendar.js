import React, { Component } from 'react';

import EventsList from './EventsList';

class Calendar extends Component {

	componentDidMount() {
		window.scrollTo(0, 0)
	}

	render () {

		return (
			<div>
				<p>Facebook har endret retningslinjene sine og fjernet web-tilgangen til eventene våre.</p> 
				<p>Vi venter på godkjenning.</p>
				<p>Inntil videre kan du se kommende eventer <a href="https://www.facebook.com/bryggoslo/events/" style={{color: "blue"}}>her</a></p>
			</div>
		);

		return (
			<div id="calendar-wrapper" className="row">
				<EventsList onClick='view' monthSeparator />
			</div>
		);
	}
}

export default Calendar;