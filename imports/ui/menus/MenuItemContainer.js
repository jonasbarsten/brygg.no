import React, { Component } from 'react';

class MenuItemContainer extends Component {
	render () {

		const container = this.props.container;

		let price = container.price;
		price = Number(price);
		price = price.toString();

		let name = '';

		if (container.type == 'beer') {
			name = container.container_size.name ? container.container_size.name : '';
		}

		if (container.type == 'custom') {
			name = container.name ? container.name : '';
		}

		return (
			<div key={container.id} className="row menu-item-container">
				<div className="col-xs-6">
					<span style={{fontFamily: 'Plaak4Terme-24-Light'}}>{name}</span>
				</div>
				<div className="col-xs-6 text-right">
					<span style={{fontFamily: 'Plaak4Terme-24-Light'}}>{price},-</span>
				</div>
			</div>
		);
	}
}
export default MenuItemContainer;