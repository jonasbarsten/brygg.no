import React, { Component } from 'react';

// import AddEvent from './AddEvent';
// import EventsList from './EventsList';

class AdminEvents extends Component {
	render () {

		return (
			<div>
				<div className="row">
					<div className="col-xs-12 text-center">
						<h4>Administrasjon av eventer skjer på facebook også slurpes den informasjonen inn på siden :)</h4>
					</div>
				</div>
			</div>
		);

		// return (
		// 	<div className="container">
		// 		<h4>Add event</h4>
		// 		<AddEvent />
		// 		<hr />
		// 		<div className="row">
		// 			<div className="col-xs-12 text-right">
		// 				<h4 style={{color: 'red'}}>Click event to delete it</h4>
		// 			</div>
		// 		</div>
		// 		<EventsList onClick='edit'/>
		// 	</div>
		// );
	}
};

export default AdminEvents;