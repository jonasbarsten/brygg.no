import React, { Component } from 'react';

import MenuSection from './MenuSection';

class SingleMenu extends Component {

	constructor () {
		super();
		this.state = {
			sections: []
		}
	}

	componentDidMount () {
		Meteor.call('menu.fetchSections', this.props.menu.id, (err, res) => {
			if (err) {
				console.log(err);
			}

			if (res) {
				this.setState({
					sections: res
				});
			}
		});
	}

	render () {

		const sections = this.state.sections;

		return (
			<div>
				<div className="menu-heading col-xs-12 text-center">
					<span>{this.props.menu.name}</span>
				</div>
				{sections.map((section) => {
					return <MenuSection key={section.id} section={section} />
				})}
			</div>
		);
	}
}

export default SingleMenu;