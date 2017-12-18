import React, { Component } from 'react';

import EventsList from './EventsList';

class Calendar extends Component {

	componentDidMount() {
		window.scrollTo(0, 0)
	}

	render () {
		return (
			<div id="calendar-wrapper" className="row">
				<EventsList onClick='view' monthSeparator />
			</div>
		);
	}
}

export default Calendar;