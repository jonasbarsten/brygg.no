import React, { Component } from 'react';

import MenuItem from './MenuItem';

class MenuSection extends Component {

	constructor () {
		super ();
		this.state = {
			items: []
		}
	}

	componentDidMount () {
		Meteor.call('menu.fetchItems', this.props.section, (err, res) => {
			if (err) {
				console.log(err);
			}

			if (res) {
				this.setState({
					items: res
				});
			}
		});
	}

	render () {

		const items = this.state.items;

		return (
			<div>
				<div className="col-xs-12 section-heading text-center">
					<span>{this.props.section.name}</span>
				</div>
				<div className="col-xs-12 section-description text-center">
					<span>{this.props.section.description}</span>
				</div>
				{items.map((item) => {

					item.type = this.props.section.type;

					return <MenuItem key={item.id} item={item} />
				})}
			</div>
		);
	}
}

export default MenuSection;