import React, { Component } from 'react';

class AddSingleCard extends Component {

	handleSubmit () {
		console.log(this.refs.number.value);
		console.log(this.refs.description.value);

		Meteor.call('card.addSingle', this.refs.number.value, this.refs.description.value, (err, res) => {
			if (err) {
				console.log(err);
			}

			if (!res.err) {
				Bert.alert(res.message, 'success', 'growl-bottom-right', 'fa-smile-o');
			}

			if (res.err) {
				Bert.alert(res.message, 'danger', 'growl-bottom-right', 'fa-frown-o');
			}

		});
	}

	render () {
		return (
			<div className="row">
				<div className="col-xs-2">
					<input type="number" className="form-control" placeholder="345 ..." ref="number" />
				</div>
				<div className="col-xs-8">
					<input type="text" className="form-control" placeholder="Friends / Employees / Owners ..." ref="description" />
				</div>
				<div className="col-xs-2 text-right">
					<button onClick={this.handleSubmit.bind(this)} className="btn btn-success">Add</button>
				</div>
			</div>
		);
	}
}

export default AddSingleCard;