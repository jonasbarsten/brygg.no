import React, { Component } from 'react';

class AddCardRange extends Component {

	handleSubmit () {
		if (Number(this.refs.endNumber.value) <= Number(this.refs.startNumber.value) || Number(this.refs.endNumber.value) < 0 || Number(this.refs.startNumber.value) < 0) {
			Bert.alert('Range not valid', 'danger', 'growl-bottom-right', 'fa-frown-o');
		} else {
			Meteor.call('card.addRange', this.refs.startNumber.value, this.refs.endNumber.value, this.refs.description.value, (err, res) => {
				if (err) {
					console.log(err);
				}
				if (res.err) {
					Bert.alert(res.message, 'danger', 'growl-bottom-right', 'fa-frown-o');
				}
				if (!res.err) {
					Bert.alert(res.message, 'success', 'growl-bottom-right', 'fa-smile-o');
				}
			});
		}
	}

	render () {
		return (
			<div className="row">
				<div className="col-xs-1 text-right">
					<p style={{marginTop: '8px'}}>From:</p>
				</div>
				<div className="col-xs-2">
					<input type="number" className="form-control" placeholder="1 ..." ref="startNumber" />
				</div>
				<div className="col-xs-1 text-right">
					<p style={{marginTop: '8px'}}>To:</p>
				</div>
				<div className="col-xs-2">
					<input type="number" className="form-control" placeholder="999 ..." ref="endNumber" />
				</div>
				<div className="col-xs-4">
					<input type="text" className="form-control" placeholder="Friends / Employees / Owners ..." ref="description" />
				</div>
				<div className="col-xs-2 text-right">
					<button onClick={this.handleSubmit.bind(this)} className="btn btn-success">Add</button>
				</div>
			</div>
		);
	}
}

export default AddCardRange;