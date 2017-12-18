import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { createContainer } from 'meteor/react-meteor-data';
import Dropdown from 'react-dropdown';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-dropdown/style.css';

class AddEvent extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedDate: moment(),
			selectedPage: ''
		}
	}

	handleKeyPress (event) {
		if(event.key == 'Enter'){
			this.handleSubmit();
		}
	}

	handleSubmit() {

		Meteor.call('event.add', this.refs.name.value, this.state.selectedDate.toDate(), this.state.selectedPage, (err, res) => {
			if (err) {
				console.log(err);
			} else {
				this.refs.name.value = '';
				this.setState({
					selectedPage: '',
					selectedDate: moment()
				});
				Bert.alert('Event added', 'success', 'growl-bottom-right', 'fa-smile-o');
			}
		});
	}

	handleDateChange(date) {
		this.setState({
			selectedDate: date.startOf('day')
		});
	}

	handlePageChange(page) {
		this.setState({
			selectedPage: page.value
		});
	}

	render() {

		const pagesArray = [];

		this.props.pages.map((page) => {
			pagesArray.push({value: page.urlFriendlyName, label: page.name});
		});

		return (
			<div onKeyPress={this.handleKeyPress.bind(this)}>
				<div className="row">
					<div className="col-xs-8">
						<input 
							placeholder="Ølsmaking med fiffen"
							type="text"
							ref="name"
							className="form-control"
						/>
					</div>

					<div className="col-xs-4 text-right">
						<DatePicker
							dateFormat="DD/MM/YYYY"
					        selected={this.state.selectedDate}
					        onChange={this.handleDateChange.bind(this)}
					        locale='nb-NO'
					        className="form-control text-right"
					    />
					</div>
				</div>

				<div className="spacer-10"></div>

				<div className="row">

					<div className="col-xs-8">
						<Dropdown 
							options={pagesArray} 
							onChange={this.handlePageChange.bind(this)}
							placeholder="Choose associated page ..."
							value= {this.state.selectedPage}
						/>
					</div>

					<div className="col-xs-4 text-right">
						<button style={{marginTop: 3}} onClick={this.handleSubmit.bind(this)} className="btn btn-success">Add</button>
					</div>

				</div>
			</div>
		);
	}
}

export default createContainer(() => {
	Meteor.subscribe('pages');

	return {
		pages: Pages.find({}, {fields: {name: 1, urlFriendlyName: 1}}).fetch()
	};
}, AddEvent);