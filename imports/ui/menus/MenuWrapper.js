import React, { Component } from 'react';

import Preloader from '../utilities/Preloader';
import SingleMenu from './SingleMenu';

class MenuWrapper extends Component {

	constructor () {
		super ();
		this.state = {
			menus: [],
			selectedMenu: null
		}
	}

	componentDidMount () {

		Meteor.call('menu.track', (err, res) => {
			if (err) {
				console.log(err);
			}

			if (res) {
				console.log(res);
			}
		});

		Meteor.call('menu.fetchMenus', (err, res) => {
			if (err) {
				console.log(err);
			}

			if (res) {
				this.setState({
					menus: res,
					selectedMenu: res[0].id
				});
			}
		});
	}

	filterMenus (menu) {
	    return menu.id == this.state.selectedMenu;
	}

	render () {

		const menus = this.state.menus;
		let selectedMenu = [];

		if (this.state.selectedMenu) {
			selectedMenu = menus.filter(this.filterMenus.bind(this));
		}

		if (menus.length < 1 || selectedMenu.length < 1) {
			return <Preloader />
		}

		return (
			<div id="menu-wrapper" className="row">
				<div id="menu-selector" className="col-xs-12">
					{menus.map((menu, i) => {

						let seperator = '|';

						if (i == menus.length - 1) {
							seperator = '';
						}

						return (
							<div key={menu.id} style={{fontFamily: 'Plaak6Ney-36-Regular', display: 'inline'}}>
								<div 
									onClick={() => this.setState({selectedMenu: menu.id})}
									className='menu-selector-item hover'
								>
									{menu.name}
								</div>
								<div style={{fontFamily: 'Plaak6Ney-36-Regular'}} className="menu-selector-item-seperator">{seperator}</div>
							</div>
						);
					})}
				</div>
				
				<SingleMenu key={selectedMenu[0].id} menu={selectedMenu[0]} />

			</div>
		);
	}
}

export default MenuWrapper;