import React, { Component } from 'react';

import MenuItemContainer from './MenuItemContainer';

class MenuItem extends Component {

	constructor () {
		super ();
		this.state = {
			containers: []
		}
	}

	componentDidMount () {
		Meteor.call('menu.fetchContainers', this.props.item.id, (err, res) => {
			if (err) {
				console.log(err);
			}

			if (res) {
				this.setState({
					containers: res
				});
			}
		});
	}


	render () {

		const item = this.props.item;
		const containers = this.state.containers;

		return (
			
			<div className="col-xs-12 menu-item">
				<div className="row">
					<div className="col-xs-9">
						<div className="row">
							<div className="col-xs-12 menu-item-brewery">
								<span style={{fontFamily: 'Plaak4Terme-24-Light'}}>{item.brewery}</span>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-12 menu-item-name">
								<span style={{fontFamily: 'Plaak4Terme-44-BoldA'}}>{item.name}</span>
							</div>
						</div>
					</div>
					<div className="col-xs-3">
						<img className="pull-right img-responsive" src={item.label_image} />
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12 menu-item-detail">
						<span style={{fontFamily: 'Archivo-Bold'}}>{item.abv} ABV &middot; {item.style}</span>
					</div>
				</div>
				<div className="row">
					<div className="col-xs-12 menu-item-description">
						<span style={{fontFamily: 'Archivo-Regular'}}>{item.description}</span>
					</div>
				</div>
				<div className="menu-item-container-wrapper">
					{containers.map((container) => {

						return <MenuItemContainer key={container.id} container={container} />

					})}
				</div>
				<hr />
			</div>
			
		);
	}
}

export default MenuItem;